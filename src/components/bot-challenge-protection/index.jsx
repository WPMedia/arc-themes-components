import React, { useEffect } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";
import PropTypes from "prop-types";

import useIdentity from "../../utils/hooks/use-identity";
import Paragraph from "../paragraph";
import useRecaptcha, { RECAPTCHA_V2, RECAPTCHA_V3 } from "../../utils/hooks/use-reCaptcha";
import RecaptchaV3 from "./reCaptchaV3";
import { ARCXP_CAPTCHA } from "./constants";

const BotChallengeProtection = ({
	className,
	challengeIn,
	setCaptchaToken,
	captchaError,
	error,
	setCaptchaError,
	captchaErrorText,
	resetRecaptcha,
}) => {
	const { isInitialized } = useIdentity();
	const { recaptchaVersion, siteKey, isRecaptchaEnabled } = useRecaptcha(challengeIn);
	const recaptchaRef = React.createRef();

	useEffect(() => {
		if (captchaError || error) {
			recaptchaRef.current.reset();
		}
	}, [resetRecaptcha, captchaError, error, recaptchaRef]);

	const onChange = (value) => {
		setCaptchaToken(value);
		setCaptchaError(null);
		localStorage.setItem(ARCXP_CAPTCHA, value);
	};

	if (!isInitialized) {
		return null;
	}

	if (isRecaptchaEnabled && !!siteKey && !!recaptchaVersion) {
		if (recaptchaVersion === RECAPTCHA_V2) {
			return (
				/* istanbul ignore next */
				<section
					className={`${className}__bot-protection-section`}
					data-testid="bot-challege-protection-container-V2"
				>
					<ReCAPTCHA
						ref={recaptchaRef}
						sitekey={siteKey}
						onChange={onChange}
						onExpired={() => {}}
					/>
					{captchaError && <Paragraph>{captchaErrorText}</Paragraph>}
				</section>
			);
		}
		if (recaptchaVersion === RECAPTCHA_V3) {
			return (
				/* istanbul ignore next */
				<section data-testid="bot-challege-protection-container-V3">
					<GoogleReCaptchaProvider reCaptchaKey={siteKey} scriptProps={{ async: true }}>
						<RecaptchaV3 setCaptchaToken={setCaptchaToken} resetRecaptcha={resetRecaptcha} />
					</GoogleReCaptchaProvider>
				</section>
			);
		}
	} else {
		return null;
	}

	return null;
};

BotChallengeProtection.propTypes = {
	/** Class name(s) that get appended to default class name of the component. */
	className: PropTypes.string,
	/** Variant where the bothChallenge could appear. */
	challengeIn: PropTypes.oneOf(["signin", "signup", "magicLink", "checkout"]),
	/** Function to save the reCaptcha token */
	setCaptchaToken: PropTypes.func.isRequired,
	/** Object containing the error details */
	captchaError: PropTypes.object,
	/** Function to set the reCaptcha error */
	setCaptchaError: PropTypes.func.isRequired,
	/** The text displayed within the component, if there is a captcha error. */
	captchaErrorText: PropTypes.string,
	/** Boolean value, when changing reCaptcha V3 is obtained again */
	resetRecaptcha: PropTypes.bool.isRequired,
};

export default BotChallengeProtection;