const signImagesInANSObject =
	(cachedCall, fetcher, resizerAppVersion, cacheKey = "image-token") =>
	({ data, ...rest }) => {
		const replacements = new Set();

		const stringData = JSON.stringify(data, (key, value) => {
			if (value === null || typeof value === "undefined") {
				return value;
			}
			const { _id, type, auth, url } = value;
			console.log(value)
			if (!auth?.[resizerAppVersion] && type === "image") {
				replacements.add(_id || url);
				return {
					...value,
					auth: {
						...value.auth,
						[resizerAppVersion]: `__replaceMe${_id || url}__`,
					},
				};
			}

			// Handle credits.by author images
			const { image } = value;
			if (type === "author" && image?.url && !image?.auth?.[resizerAppVersion]) {
				replacements.add(image.url);
				return {
					...value,
					image: {
						...image,
						type: "image",
						auth: {
							...value.auth,
							[resizerAppVersion]: `__replaceMe${image.url}__`,
						},
					}
				};
			}

			// Handle author-api author images
			const { authors = [] } = value;
			if (authors.length > 0 && typeof authors[0].image === "string") {
				return {
					...value,
					authors: authors.map((author) => {
						replacements.add(author.image);
						return {
							...author,
							ansImage: {
								...image,
								type: "image",
								url: author.image,
								auth: {
									...value.auth,
									[resizerAppVersion]: `__replaceMe${author.image}__`,
								},
							}
						};
					})
				}
			}
			return value;
		});

		return Promise.all(
			Array.from(replacements).map((id) =>
				cachedCall(`${cacheKey}-${id}`, fetcher, {
					query: { id },
					ttl: 31536000,
					independent: true,
				}).then((auth) => ({ id, auth }))
			)
		).then((authResults) => {
			const replaced = authResults.reduce(
				(accumulator, { id, auth }) =>
					accumulator.replace(new RegExp(`__replaceMe${id}__`, "g"), auth.hash),
				stringData
			);
			return {
				data: JSON.parse(replaced),
				...rest,
			};
		});
	};

export default signImagesInANSObject;
