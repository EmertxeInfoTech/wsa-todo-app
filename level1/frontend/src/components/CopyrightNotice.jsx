import React from "react";
const defaultNoticeText = "© 2025 WSA. All rights reserved";
export default function CopyrightNotice({ noticeText = defaultNoticeText }) {
  return <p className="getting-started-copyright-text">{noticeText}</p>;
}
