import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import logo from "./../../assets/images/logo.svg";

function FooterLower(props) {
  const { global } = props;

  return (
    <div className="footer-lower">
      <div className="lower-inner">
        <div className="footer-menu">
          <ul>
            <li>
              <Link
                to={`/${global.activeLanguage}/sitemap`}
              >
                {global.activeLanguage == 'en' ? 'Sitemap' : 'خريطة الموقع' }
              </Link>
            </li>
            <li>
              <Link
                to={`/${global.activeLanguage}/subsidiaries`}
              >
                {global.activeLanguage == 'en' ? 'Subsidiaries' : 'الفروع' }
              </Link>
            </li>
            <li>
              <Link
                to={`/${global.activeLanguage}/disclosure-policy`}
              >
                {global.activeLanguage == 'en' ? 'Disclosure Policy' : 'سياسة الإفصاح عن المعلومات' }
              </Link>
            </li>
            <li>
              <Link
                to={`/${global.activeLanguage}/privacy-protection-policy`}
              >
                {global.activeLanguage == 'en' ? 'Policy on Privacy Protection' : 'سياسة حماية الخصوصية'}
              </Link>
            </li>
            <li>
              <Link
                to={`/${global.activeLanguage}/social-media-policy`}
              >
                {global.activeLanguage == 'en' ? 'Social Media Policy' : 'سياسة وسائل التواصل الإجتماعي' }
              </Link>
            </li>
            <li>
              <Link
                to={`/${global.activeLanguage}/term-of-use`}
              >
                {global.activeLanguage == 'en' ? 'Terms of Use' : 'شروط الإستخدام' }
              </Link>
            </li>
          </ul>
          <p className="logo">
            <img src={logo} alt="pigeon-logo" />
          </p>
        </div>
        <div
            // className="copyright"
            className={`copyright ${
                props.language === "ar"
                    ? "copyrightArabic"
                    : ""
            }`}

        >
          <p>
          {global.activeLanguage == 'en' ? 'Copyrights © Pigeon Corporation. All Rights Reserved.' : 'حقوق النشر لشركة بيجون ©. جميع الحقوق محفوظة.' }
          </p>
        </div>
      </div>
    </div>
  );
}

// export default FooterLower;

const mapStateToProps = (state) => {
  return {
    global: state.globalReducer,
  };
};

export default connect(mapStateToProps)(FooterLower);
