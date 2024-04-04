/* global grecaptcha */
import ReCAPTCHA from "react-google-recaptcha";
import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";

import useIdentity from "../../utils/hooks/use-identity";
import Paragraph from "../paragraph";
import useRecaptcha, { RECAPTCHA_V2, RECAPTCHA_V3 } from "../../utils/hooks/use-reCaptcha";

import PropTypes from "prop-types";

// eslint-disable-next-line
import RecaptchaV3 from "./reCaptchaV3";
import { useEffect } from "react";

export const ARCXP_CAPTCHA= "ArcXP_captchaToken"

const BotChallengeProtection = ({ className, challengeIn, setCaptchaToken, captchaError, error, setCaptchaError, captchaErrorText, resetRecaptcha }) => {
	
	const { isInitialized } = useIdentity();
	const { recaptchaVersion, siteKey, isRecaptchaEnabled } = useRecaptcha(challengeIn);
	const recaptchaRef = React.createRef();

	const onChange = (value) => {
		setCaptchaToken(value);
		setCaptchaError(null);
		localStorage.setItem(ARCXP_CAPTCHA, value);
	};

	if (!isInitialized) {
		return null;
	}

	useEffect(()=>{
		if (captchaError||error) {
			recaptchaRef.current.reset();
		}
	},[resetRecaptcha, captchaError, error]);

	if (isRecaptchaEnabled && !!siteKey && !!recaptchaVersion) {
		if (recaptchaVersion === RECAPTCHA_V2) {
			return (
				/* istanbul ignore next */
				<section
					className={`${className}__bot-protection-section`}
					data-testid="bot-challege-protection-container"
				>
					<ReCAPTCHA ref={recaptchaRef} sitekey={siteKey} onChange={onChange} onExpired={() => {}}/>
					{captchaError && <Paragraph>{captchaErrorText}</Paragraph>}
				</section>
			);
		}
		if (recaptchaVersion === RECAPTCHA_V3) {
			return (
				/* istanbul ignore next */ 
				<GoogleReCaptchaProvider reCaptchaKey={siteKey} scriptProps={{ async: true }}>
					<RecaptchaV3 setCaptchaToken={setCaptchaToken} resetRecaptcha={resetRecaptcha} />
				</GoogleReCaptchaProvider>
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