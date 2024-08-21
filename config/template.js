const GLOBALS = require('./constants');
// const exports = module.exports = {};

// OTP on Email mail template
exports.verify_email = async (result) => {
  const template = `<!DOCTYPE html>
    <html xmlns="http://www.w3.org/1999/xhtml">
        <head>
          <meta content="text/html; charset=utf-8" http-equiv="Content-Type" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <title>${GLOBALS.APP_NAME} - Verify Email</title>

            <style type="text/css">
                @media only screen and (max-width: 480px) {
                body,
                table,
                td,
                p,
                a,
                li,
                blockquote {
                    -webkit-text-size-adjust: none !important
                }
                body {
                    width: 100% !important;
                    min-width: 100% !important
                }
                td[id=bodyCell] {
                    padding: 10px !important
                }
                table.kmMobileHide {
                    display: none !important
                }
                table[class=kmTextContentContainer] {
                    width: 100% !important
                }
                table[class=kmBoxedTextContentContainer] {
                    width: 100% !important
                }
                td[class=kmImageContent] {
                    padding-left: 0 !important;
                    padding-right: 0 !important
                }
                img[class=kmImage],
                img.kmImage {
                    width: 100% !important
                }
                td.kmMobileStretch {
                    padding-left: 0 !important;
                    padding-right: 0 !important
                }
                table[class=kmSplitContentLeftContentContainer],
                table.kmSplitContentLeftContentContainer,
                table[class=kmSplitContentRightContentContainer],
                table.kmSplitContentRightContentContainer,
                table[class=kmColumnContainer],
                td[class=kmVerticalButtonBarContentOuter] table[class=kmButtonBarContent],
                td[class=kmVerticalButtonCollectionContentOuter] table[class=kmButtonCollectionContent],
                table[class=kmVerticalButton],
                table[class=kmVerticalButtonContent] {
                    width: 100% !important
                }
                td[class=kmButtonCollectionInner] {
                    padding-left: 9px !important;
                    padding-right: 9px !important;
                    padding-top: 9px !important;
                    padding-bottom: 0 !important;
                    background-color: transparent !important
                }
                td[class=kmVerticalButtonIconContent],
                td[class=kmVerticalButtonTextContent],
                td[class=kmVerticalButtonContentOuter] {
                    padding-left: 0 !important;
                    padding-right: 0 !important;
                    padding-bottom: 9px !important
                }
                table[class=kmSplitContentLeftContentContainer] td[class=kmTextContent],
                table[class=kmSplitContentRightContentContainer] td[class=kmTextContent],
                table[class=kmColumnContainer] td[class=kmTextContent],
                table[class=kmSplitContentLeftContentContainer] td[class=kmImageContent],
                table[class=kmSplitContentRightContentContainer] td[class=kmImageContent],
                table.kmSplitContentLeftContentContainer td.kmImageContent,
                table.kmSplitContentRightContentContainer td.kmImageContent {
                    padding-top: 9px !important
                }
                td[class="rowContainer kmFloatLeft"],
                td.rowContainer.kmFloatLeft,
                td[class="rowContainer kmFloatLeft firstColumn"],
                td.rowContainer.kmFloatLeft.firstColumn,
                td[class="rowContainer kmFloatLeft lastColumn"],
                td.rowContainer.kmFloatLeft.lastColumn {
                    float: left;
                    clear: both;
                    width: 100% !important
                }
                table[class=templateContainer],
                table[class="templateContainer brandingContainer"],
                div[class=templateContainer],
                div[class="templateContainer brandingContainer"],
                table[class=templateRow] {
                    max-width: 600px !important;
                    width: 100% !important
                }
                h1 {
                    font-size: 24px !important;
                    line-height: 130% !important
                }
                h2 {
                    font-size: 20px !important;
                    line-height: 130% !important
                }
                h3 {
                    font-size: 18px !important;
                    line-height: 130% !important
                }
                h4 {
                    font-size: 16px !important;
                    line-height: 130% !important
                }
                td[class=kmTextContent] {
                    font-size: 14px !important;
                    line-height: 130% !important
                }
                td[class=kmTextBlockInner] td[class=kmTextContent] {
                    padding-right: 18px !important;
                    padding-left: 18px !important
                }
                table[class="kmTableBlock kmTableMobile"] td[class=kmTableBlockInner] {
                    padding-left: 9px !important;
                    padding-right: 9px !important
                }
                table[class="kmTableBlock kmTableMobile"] td[class=kmTableBlockInner] [class=kmTextContent] {
                    font-size: 14px !important;
                    line-height: 130% !important;
                    padding-left: 4px !important;
                    padding-right: 4px !important
                }
                }
                .btn {
                  display: inline-block;
                  padding: 6px 12px;
                  margin-bottom: 0;
                  font-size: 14px;
                  font-weight: 400;
                  line-height: 1.42857143;
                  text-align: center !important;
                  white-space: nowrap;
                  vertical-align: middle;
                  -ms-touch-action: manipulation;
                  touch-action: manipulation;
                  cursor: pointer;
                  -webkit-user-select: none;
                  -moz-user-select: none;
                  -ms-user-select: none;
                  user-select: none;
                  background-image: none;
                  border: 1px solid transparent;
                  border-radius: 4px;
                }
                .btn-default, .btn-default:hover, .btn-default:focus, .btn-default:active, .btn-default.active, .btn-default.focus, .btn-default:active, .btn-default:focus, .btn-default:hover, .open > .dropdown-toggle.btn-default {
                    background: #462759 !important;
                    border: 1px solid #462759 !important;
                    color: white !important;
                    text-decoration: none !important;
                }
            </style>
            <!--[if mso]>
            <style>

              .templateContainer {
                border: 1px none #aaaaaa;
                background-color: #FFFFFF;

              }
              #brandingContainer {
                background-color: transparent !important;
                border: 0;
              }


              .templateContainerInner {
                padding: 0px;
              }

            </style>
            <![endif]-->
        </head>
          <body style="margin:0;padding:0;background-color:#FFF">
            <center>
              <table align="center" border="0" cellpadding="0" cellspacing="0" id="bodyTable" width="100%" style="border-collapse:collapse;mso-table-lspace:0;mso-table-rspace:0;padding:0;background-color:#FFF;height:100%;margin:0;width:100%">
                <tbody>
                  <tr>
                    <td align="center" id="bodyCell" valign="top" style="border-collapse:collapse;mso-table-lspace:0;mso-table-rspace:0;padding-top:50px;padding-left:20px;padding-bottom:20px;padding-right:20px;border-top:0;height:100%;margin:0;width:100%">
                      <!--[if !mso]><!-->
                      <div class="templateContainer" style="border:1px none #aaa;border-radius:45px 0px 45px 0px;background: linear-gradient(to right, #fff 0%, #fff 100%);display: table; width:600px">
                        <div class="templateContainerInner" style="padding:0">
                          <!--<![endif]-->
                    <!--[if mso]>
                      <table border="0" cellpadding="0" cellspacing="0" class="templateContainer"  width="600" style="border-collapse:collapse;mso-table-lspace:0;mso-table-rspace:0;">
                      <tbody>
                        <tr>
                          <td class="templateContainerInner" style="border-collapse:collapse;mso-table-lspace:0;mso-table-rspace:0;">
                            <![endif]-->
                            <table border="0" cellpadding="0" cellspacing="0" width="100%" style="border-collapse:collapse;mso-table-lspace:0;mso-table-rspace:0">
                              <tr>
                                <td align="center" valign="top" style="border-collapse:collapse;mso-table-lspace:0;mso-table-rspace:0">
                                  <table border="0" cellpadding="0" cellspacing="0" class="templateRow" width="100%" style="border-collapse:collapse;mso-table-lspace:0;mso-table-rspace:0">
                                    <tbody>
                                      <tr>
                                        <td class="rowContainer kmFloatLeft" valign="top" style="border-collapse:collapse;mso-table-lspace:0;mso-table-rspace:0">
                                          <table border="0" cellpadding="0" cellspacing="0" class="kmTextBlock" width="100%" style="border-collapse:collapse;mso-table-lspace:0;mso-table-rspace:0">
                                            <tbody class="kmTextBlockOuter">
                                              <tr>
                                                <td class="kmTextBlockInner" valign="top" style="border-collapse:collapse;mso-table-lspace:0;mso-table-rspace:0;">
                                                  <table align="left" border="0" cellpadding="0" cellspacing="0" class="kmTextContentContainer" width="100%" style="border-collapse:collapse;mso-table-lspace:0;mso-table-rspace:0">
                                                    <tbody>
                                                      <tr>
                                                        <td class="kmTextContent" valign="top" style="border-collapse:collapse;mso-table-lspace:0;mso-table-rspace:0;color:#000;font-family:Helvetica, Arial;font-size:14px;line-height:150%;text-align:left;padding-top:9px;padding-bottom:9px;padding-left:18px;padding-right:18px;">
                                                        </td>
                                                      </tr>
                                                    </tbody>
                                                  </table>
                                                </td>
                                              </tr>
                                            </tbody>
                                          </table>
                                          <table border="0" cellpadding="0" cellspacing="0" class="kmImageBlock" width="100%" style="border-collapse:collapse;mso-table-lspace:0;mso-table-rspace:0;min-width:100%">
                                            <tbody class="kmImageBlockOuter">
                                              <tr>
                                                <td class="kmImageBlockInner" style="border-collapse:collapse;mso-table-lspace:0;mso-table-rspace:0;padding:9px;" valign="top">
                                                  <table align="left" border="0" cellpadding="0" cellspacing="0" class="kmImageContentContainer" width="100%" style="border-collapse:collapse;mso-table-lspace:0;mso-table-rspace:0;min-width:100%">
                                                    <tbody>
                                                      <tr>
                                                        <td class="kmImageContent" valign="top" style="border-collapse:collapse;mso-table-lspace:0;mso-table-rspace:0;padding:0;padding-top:0px;padding-bottom:0;padding-left:9px;padding-right:9px;text-align: center;
                                                        background: linear-gradient(to right, #fff 0%, #fff 100%) !important;">
                                                          <!-- Your Logo -->

                                                          <img align="center" alt="${GLOBALS.APP_NAME}" class="kmImage" src="${GLOBALS.BASE_URL_WITHOUT_API}${GLOBALS.LOGO}" width="100" style="border:0;height:auto;line-height:100%;outline:none;text-decoration:none;padding-bottom:0;display:inline;vertical-align:bottom;max-width:199px;border-radius: 5px;"/>
                                                        </td>
                                                      </tr>
                                                    </tbody>
                                                  </table>
                                                </td>
                                              </tr>
                                            </tbody>
                                          </table>
                                          <table border="0" cellpadding="0" cellspacing="0" class="kmTextBlock" width="100%" style="border-collapse:collapse;mso-table-lspace:0;mso-table-rspace:0">
                                            <tbody class="kmTextBlockOuter">
                                              <tr>
                                                <td class="kmTextBlockInner" valign="top" style="border-collapse:collapse;mso-table-lspace:0;mso-table-rspace:0;">
                                                  <table align="left" border="0" cellpadding="0" cellspacing="0" class="kmTextContentContainer" width="100%" style="border-collapse:collapse;mso-table-lspace:0;mso-table-rspace:0">
                                                    <tbody>
                                                      <tr>
                                                        <td class="kmTextContent" valign="top" style="border-collapse:collapse;mso-table-lspace:0;mso-table-rspace:0;color:#000;font-family:Helvetica, Arial;font-size:14px;line-height:150%;text-align:left;padding-top:9px;padding-bottom:9px;padding-left:18px;padding-right:18px;">
                                                          <span style="color:#000000;"></span>
                                                          <!-- Your Content As below -->
                                                          <p style="margin:0;padding-bottom:1em;text-align: justify;"><span style="font-size:16px;"><span style="color: rgb(0, 0, 0);"><span style="font-family: arial,helvetica,sans-serif;"></span></span></span></p>
                                                          <p style="margin:0;padding-bottom:1em"><span style="font-family:arial,helvetica,sans-serif;"><span style="font-size: 16px;"><strong>Dear User</strong>,</span></span></p>

                                                          <p style="margin:0;padding-bottom:1em">Your OTP is <strong>${result.otp_code}</strong>.</p>

                                                          <p style="margin:0;padding-bottom:1em">Welcome to ${GLOBALS.APP_NAME}! Thank you for joining ${GLOBALS.APP_NAME}.</p>

                                                          <p style="margin:0;padding-bottom:1em"> If you did not request this change, please let us know by replying to this email.</p>

                                                          <p style="margin:0;padding-bottom:1em"> </p>
                                                          <p style="margin:0;padding-bottom:1em"><span style="font-family:arial,helvetica,sans-serif;"><span style="font-size: 16px;">Kind Regards,</span></span></p>
                                                          <p style="margin:0;padding-bottom:0"><span style="font-family:arial,helvetica,sans-serif;"><span style="font-size: 16px;">${GLOBALS.APP_NAME}</span></span></p>
                                                        </td>
                                                      </tr>
                                                    </tbody>
                                                  </table>
                                                </td>
                                              </tr>
                                            </tbody>
                                          </table>
                                        </td>
                                      </tr>
                                    </tbody>
                                  </table>
                                </td>
                              </tr>
                            </table>
                            <!--[if !mso]><!-->
                          </div>
                        </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </center>
          </body>
      </html>
    `;
  return template;
}

// forgot password mail template
exports.forgot_password = async (result) => {
  const template = `<!DOCTYPE html>
    <html xmlns="http://www.w3.org/1999/xhtml">
        <head>
          <meta content="text/html; charset=utf-8" http-equiv="Content-Type" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <title>${GLOBALS.APP_NAME} - Forgot Password</title>
    
            <style type="text/css">
                @media only screen and (max-width: 480px) {
                body,
                table,
                td,
                p,
                a,
                li,
                blockquote {
                    -webkit-text-size-adjust: none !important
                }
                body {
                    width: 100% !important;
                    min-width: 100% !important
                }
                td[id=bodyCell] {
                    padding: 10px !important
                }
                table.kmMobileHide {
                    display: none !important
                }
                table[class=kmTextContentContainer] {
                    width: 100% !important
                }
                table[class=kmBoxedTextContentContainer] {
                    width: 100% !important
                }
                td[class=kmImageContent] {
                    padding-left: 0 !important;
                    padding-right: 0 !important
                }
                img[class=kmImage],
                img.kmImage {
                    width: 100% !important
                }
                td.kmMobileStretch {
                    padding-left: 0 !important;
                    padding-right: 0 !important
                }
                table[class=kmSplitContentLeftContentContainer],
                table.kmSplitContentLeftContentContainer,
                table[class=kmSplitContentRightContentContainer],
                table.kmSplitContentRightContentContainer,
                table[class=kmColumnContainer],
                td[class=kmVerticalButtonBarContentOuter] table[class=kmButtonBarContent],
                td[class=kmVerticalButtonCollectionContentOuter] table[class=kmButtonCollectionContent],
                table[class=kmVerticalButton],
                table[class=kmVerticalButtonContent] {
                    width: 100% !important
                }
                td[class=kmButtonCollectionInner] {
                    padding-left: 9px !important;
                    padding-right: 9px !important;
                    padding-top: 9px !important;
                    padding-bottom: 0 !important;
                    background-color: transparent !important
                }
                td[class=kmVerticalButtonIconContent],
                td[class=kmVerticalButtonTextContent],
                td[class=kmVerticalButtonContentOuter] {
                    padding-left: 0 !important;
                    padding-right: 0 !important;
                    padding-bottom: 9px !important
                }
                table[class=kmSplitContentLeftContentContainer] td[class=kmTextContent],
                table[class=kmSplitContentRightContentContainer] td[class=kmTextContent],
                table[class=kmColumnContainer] td[class=kmTextContent],
                table[class=kmSplitContentLeftContentContainer] td[class=kmImageContent],
                table[class=kmSplitContentRightContentContainer] td[class=kmImageContent],
                table.kmSplitContentLeftContentContainer td.kmImageContent,
                table.kmSplitContentRightContentContainer td.kmImageContent {
                    padding-top: 9px !important
                }
                td[class="rowContainer kmFloatLeft"],
                td.rowContainer.kmFloatLeft,
                td[class="rowContainer kmFloatLeft firstColumn"],
                td.rowContainer.kmFloatLeft.firstColumn,
                td[class="rowContainer kmFloatLeft lastColumn"],
                td.rowContainer.kmFloatLeft.lastColumn {
                    float: left;
                    clear: both;
                    width: 100% !important
                }
                table[class=templateContainer],
                table[class="templateContainer brandingContainer"],
                div[class=templateContainer],
                div[class="templateContainer brandingContainer"],
                table[class=templateRow] {
                    max-width: 600px !important;
                    width: 100% !important
                }
                h1 {
                    font-size: 24px !important;
                    line-height: 130% !important
                }
                h2 {
                    font-size: 20px !important;
                    line-height: 130% !important
                }
                h3 {
                    font-size: 18px !important;
                    line-height: 130% !important
                }
                h4 {
                    font-size: 16px !important;
                    line-height: 130% !important
                }
                td[class=kmTextContent] {
                    font-size: 14px !important;
                    line-height: 130% !important
                }
                td[class=kmTextBlockInner] td[class=kmTextContent] {
                    padding-right: 18px !important;
                    padding-left: 18px !important
                }
                table[class="kmTableBlock kmTableMobile"] td[class=kmTableBlockInner] {
                    padding-left: 9px !important;
                    padding-right: 9px !important
                }
                table[class="kmTableBlock kmTableMobile"] td[class=kmTableBlockInner] [class=kmTextContent] {
                    font-size: 14px !important;
                    line-height: 130% !important;
                    padding-left: 4px !important;
                    padding-right: 4px !important
                }
                }
                .btn {
                  display: inline-block;
                  padding: 6px 12px;
                  margin-bottom: 0;
                  font-size: 14px;
                  font-weight: 400;
                  line-height: 1.42857143;
                  text-align: center !important;
                  white-space: nowrap;
                  vertical-align: middle;
                  -ms-touch-action: manipulation;
                  touch-action: manipulation;
                  cursor: pointer;
                  -webkit-user-select: none;
                  -moz-user-select: none;
                  -ms-user-select: none;
                  user-select: none;
                  background-image: none;
                  border: 1px solid transparent;
                  border-radius: 4px;
                }
                .btn-default, .btn-default:hover, .btn-default:focus, .btn-default:active, .btn-default.active, .btn-default.focus, .btn-default:active, .btn-default:focus, .btn-default:hover, .open > .dropdown-toggle.btn-default {
                    background: #462759 !important;
                    border: 1px solid #462759 !important;
                    color: white !important;
                    text-decoration: none !important;
                }
            </style>
            <!--[if mso]>
            <style>
              
              .templateContainer {
                border: 1px none #aaaaaa;
                background-color: #FFFFFF;
                
              }
              #brandingContainer {
                background-color: transparent !important;
                border: 0;
              }
              
              
              .templateContainerInner {
                padding: 0px;
              }
              
            </style>
            <![endif]-->
        </head>
          <body style="margin:0;padding:0;background-color:#FFF">
            <center>
              <table align="center" border="0" cellpadding="0" cellspacing="0" id="bodyTable" width="100%" style="border-collapse:collapse;mso-table-lspace:0;mso-table-rspace:0;padding:0;background-color:#FFF;height:100%;margin:0;width:100%">
                <tbody>
                  <tr>
                    <td align="center" id="bodyCell" valign="top" style="border-collapse:collapse;mso-table-lspace:0;mso-table-rspace:0;padding-top:50px;padding-left:20px;padding-bottom:20px;padding-right:20px;border-top:0;height:100%;margin:0;width:100%">
                      <!--[if !mso]><!-->
                      <div class="templateContainer" style="border:1px none #aaa;border-radius:45px 0px 45px 0px;background: linear-gradient(to right, #fff 0%, #fff 100%);display: table; width:600px">
                        <div class="templateContainerInner" style="padding:0">
                          <!--<![endif]-->
                    <!--[if mso]>
                      <table border="0" cellpadding="0" cellspacing="0" class="templateContainer"  width="600" style="border-collapse:collapse;mso-table-lspace:0;mso-table-rspace:0;">
                      <tbody>
                        <tr>
                          <td class="templateContainerInner" style="border-collapse:collapse;mso-table-lspace:0;mso-table-rspace:0;">
                            <![endif]-->
                            <table border="0" cellpadding="0" cellspacing="0" width="100%" style="border-collapse:collapse;mso-table-lspace:0;mso-table-rspace:0">
                              <tr>
                                <td align="center" valign="top" style="border-collapse:collapse;mso-table-lspace:0;mso-table-rspace:0">
                                  <table border="0" cellpadding="0" cellspacing="0" class="templateRow" width="100%" style="border-collapse:collapse;mso-table-lspace:0;mso-table-rspace:0">
                                    <tbody>
                                      <tr>
                                        <td class="rowContainer kmFloatLeft" valign="top" style="border-collapse:collapse;mso-table-lspace:0;mso-table-rspace:0">
                                          <table border="0" cellpadding="0" cellspacing="0" class="kmTextBlock" width="100%" style="border-collapse:collapse;mso-table-lspace:0;mso-table-rspace:0">
                                            <tbody class="kmTextBlockOuter">
                                              <tr>
                                                <td class="kmTextBlockInner" valign="top" style="border-collapse:collapse;mso-table-lspace:0;mso-table-rspace:0;">
                                                  <table align="left" border="0" cellpadding="0" cellspacing="0" class="kmTextContentContainer" width="100%" style="border-collapse:collapse;mso-table-lspace:0;mso-table-rspace:0">
                                                    <tbody>
                                                      <tr>
                                                        <td class="kmTextContent" valign="top" style="border-collapse:collapse;mso-table-lspace:0;mso-table-rspace:0;color:#000;font-family:Helvetica, Arial;font-size:14px;line-height:150%;text-align:left;padding-top:9px;padding-bottom:9px;padding-left:18px;padding-right:18px;">
                                                        </td>
                                                      </tr>
                                                    </tbody>
                                                  </table>
                                                </td>
                                              </tr>
                                            </tbody>
                                          </table>
                                          <table border="0" cellpadding="0" cellspacing="0" class="kmImageBlock" width="100%" style="border-collapse:collapse;mso-table-lspace:0;mso-table-rspace:0;min-width:100%">
                                            <tbody class="kmImageBlockOuter">
                                              <tr>
                                                <td class="kmImageBlockInner" style="border-collapse:collapse;mso-table-lspace:0;mso-table-rspace:0;padding:9px;" valign="top">
                                                  <table align="left" border="0" cellpadding="0" cellspacing="0" class="kmImageContentContainer" width="100%" style="border-collapse:collapse;mso-table-lspace:0;mso-table-rspace:0;min-width:100%">
                                                    <tbody>
                                                      <tr>
                                                        <td class="kmImageContent" valign="top" style="border-collapse:collapse;mso-table-lspace:0;mso-table-rspace:0;padding:0;padding-top:0px;padding-bottom:0;padding-left:9px;padding-right:9px;text-align: center;
                                                        background: linear-gradient(to right, #fff 0%, #fff 100%) !important;">
                                                          <!-- Your Logo -->
    
                                                          <img align="center" alt="${GLOBALS.APP_NAME}" class="kmImage" src="${GLOBALS.BASE_URL_WITHOUT_API}${GLOBALS.LOGO}" width="100" style="border:0;height:auto;line-height:100%;outline:none;text-decoration:none;padding-bottom:0;display:inline;vertical-align:bottom;max-width:199px;border-radius: 5px;"/>
                                                        </td>
                                                      </tr>
                                                    </tbody>
                                                  </table>
                                                </td>
                                              </tr>
                                            </tbody>
                                          </table>
                                          <table border="0" cellpadding="0" cellspacing="0" class="kmTextBlock" width="100%" style="border-collapse:collapse;mso-table-lspace:0;mso-table-rspace:0">
                                            <tbody class="kmTextBlockOuter">
                                              <tr>
                                                <td class="kmTextBlockInner" valign="top" style="border-collapse:collapse;mso-table-lspace:0;mso-table-rspace:0;">
                                                  <table align="left" border="0" cellpadding="0" cellspacing="0" class="kmTextContentContainer" width="100%" style="border-collapse:collapse;mso-table-lspace:0;mso-table-rspace:0">
                                                    <tbody>
                                                      <tr>
                                                        <td class="kmTextContent" valign="top" style="border-collapse:collapse;mso-table-lspace:0;mso-table-rspace:0;color:#000;font-family:Helvetica, Arial;font-size:14px;line-height:150%;text-align:left;padding-top:9px;padding-bottom:9px;padding-left:18px;padding-right:18px;">
                                                          <span style="color:#000000;"></span>
                                                          <!-- Your Content As below -->
                                                          <p style="margin:0;padding-bottom:1em;text-align: justify;"><span style="font-size:16px;"><span style="color: rgb(0, 0, 0);"><span style="font-family: arial,helvetica,sans-serif;"></span></span></span></p>
                                                      
                                                          
                                                          <p style="margin:0;padding-bottom:1em"><span style="font-family:arial,helvetica,sans-serif;"><span style="font-size: 16px;"><strong>Dear ${result.name}</strong>,</span></span></p>

                                                          <h1 class="null" style='color: #2a2a2a; font-family: "Asap", Helvetica, sans-serif; font-size: 32px; font-style: normal; font-weight: bold; line-height:125%; letter-spacing: 2px; text-align: center; display: block; margin: 0;padding: 0'><span style="text-transform:uppercase">Forgot</span></h1>
  
                                                          <h2 class="null" style='color: #2a2a2a; font-family: "Asap", Helvetica, sans-serif; font-size: 24px; font-style: normal; font-weight: bold; line-height:125%; letter-spacing: 1px; text-align: center; display: block; margin: 0; padding: 0'><span style="text-transform:uppercase">your password?</span></h2>

                                                          <br>
                                                         
                                                          <p style="margin:0;padding-bottom:1em">Not to worry, we got you! Let’s get you a new password.</p>
                                          
                                                          
                                                          <p style="text-align: center;margin:0;padding-bottom:1em">
                                                            <span style="font-family:arial,helvetica,sans-serif;">
                                                              <span style="font-size: 16px;">
                                                                
                                                                <a href="${result.url}" style="background:#0075BE;text-decoration:none !important; font-weight:500; margin-top:3px; color:#fff;text-transform:uppercase; padding:10px 24px;display:inline-block;border-radius:50px;">Reset Password</a>

                                                              </span>
                                                            </span>
                                                          </p>

                                                          <p style="margin:0;padding-bottom:1em"> If you did not request this change, please let us know by replying to this email.</p>

                                                          <p style="margin:0;padding-bottom:1em"> </p>
                                                          <p style="margin:0;"><span style="font-family:arial,helvetica,sans-serif;"><span style="font-size: 16px;">Kind Regards,</span></span></p>
                                                          <p style="margin:0;padding-bottom:0"><span style="font-family:arial,helvetica,sans-serif;"><span style="font-size: 16px;">${GLOBALS.APP_NAME}</span></span></p>
                                                        </td>
                                                      </tr>
                                                    </tbody>
                                                  </table>
                                                </td>
                                              </tr>
                                            </tbody>
                                          </table>
                                        </td>
                                      </tr>
                                    </tbody>
                                  </table>
                                </td>
                              </tr>
                            </table>
                            <!--[if !mso]><!-->
                          </div>
                        </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </center>
          </body>
      </html>
    `;
  return template;
}

exports.share_credentails = async (result) => {

  const template = `
  <!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <meta content="text/html; charset=utf-8" http-equiv="Content-Type" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>${GLOBALS.APP_NAME} - Share Credentials</title>
    <style>
        body {
            margin: 0;
            padding: 0;
            background-color: #f9f9f9;
            font-family: Arial, sans-serif;
        }
       .container {
            max-width: 600px;
            margin: 40px auto;
            padding: 20px;
            background-color: #fff;
            border: 1px solid #ddd;
            border-radius: 10px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }
       .header {
            background-color: #333;
            color: #fff;
            padding: 10px;
            text-align: center;
            border-radius: 10px 10px 0 0;
        }
       .logo {
            width: 100px;
            height: 100px;
            margin: 20px auto;
        }
       .content {
            padding: 20px;
        }
       .credentials {
            margin-bottom: 20px;
        }
       .credentials label {
            display: block;
            margin-bottom: 10px;
        }
       .credentials span {
            font-weight: bold;
        }
       .button {
            background-color: #4CAF50;
            color: #fff;
            border: none;
            padding: 10px 20px;
            font-size: 16px;
            cursor: pointer;
            border-radius: 5px;
        }
       .button:hover {
            background-color: #3e8e41;
        }
       .footer {
            background-color: #333;
            color: #fff;
            padding: 10px;
            text-align: center;
            border-radius: 0 0 10px 10px;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <img src="${GLOBALS.BASE_URL_WITHOUT_API + GLOBALS.LOGO}" alt="Logo" class="logo">
            <h2>Welcome to ${GLOBALS.APP_NAME}!</h2>
        </div>
        <div class="content">
            <h3>Your Credentials</h3>
            <div class="credentials">
                <label>Email:</label>
                <span>${result.email}</span>
                <br>
                <label>Password:</label>
                <span>${result.password}</span>
            </div>
            <p>Use the above credentials to sign in and please remember to update your password after your first login for security reasons.</p>
            <a href="${result.login_url}" class="button">Login Now</a>
            <p>If you have any questions, feel free to reach out to our support team. We're here to help!</p>
        </div>
        <div class="footer">
            <p>&copy; ${require('moment')().format('YYYY')} ${GLOBALS.APP_NAME} | All Rights Reserved.</p>
        </div>
    </div>
</body>
</html>
    `;

  return template;

}


exports.reply_contactus = async (result) => {

  const template = `<!DOCTYPE html>
  <html xmlns="http://www.w3.org/1999/xhtml">
  <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <title>${GLOBALS.APP_NAME} - Reply to Contact Us Query</title>
      <style>
          body {
              font-family: Arial, sans-serif;
              margin: 0;
              padding: 0;
          }
          .container {
              max-width: 600px;
              margin: 40px auto;
              padding: 20px;
              background-color: #f9f9f9;
              border: 1px solid #ddd;
              border-radius: 10px;
              box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
          }
          .header {
            background-color: #333;
            color: #fff;
            padding: 10px;
            text-align: center;
            border-radius: 10px 10px 0 0;
        }
          .header img {
              width: 100px;
              height: auto;
              margin: 10px auto;
          }
          .content {
              padding: 20px;
          }
          .content p {
              margin-bottom: 20px;
          }
          .footer {
              background-color: #f9f9f9;
              padding: 10px;
              text-align: center;
              border-top: 1px solid #ddd;
          }
          .btn {
              display: inline-block;
              padding: 6px 12px;
              margin-bottom: 0;
              font-size: 14px;
              font-weight: 400;
              line-height: 1.42857143;
              text-align: center;
              white-space: nowrap;
              vertical-align: middle;
              cursor: pointer;
              background-color: #462759;
              color: #ffffff;
              border: none;
              border-radius: 4px;
          }
          .btn:hover {
              background-color: #333;
          }
          .footer {
            background-color: #333;
            color: #fff;
            padding: 10px;
            text-align: center;
            border-radius: 0 0 10px 10px;
        }
      </style>
  </head>
  <body>
      <div class="container">
          <div class="header">
              <img src="${GLOBALS.BASE_URL_WITHOUT_API + GLOBALS.LOGO}" alt="${GLOBALS.APP_NAME}">
          </div>
          <div class="content">
              <p>Dear ${result.name},</p>
              <p>Thank you for contacting us. We appreciate your interest in our organization.</p>
              <p>Regarding your query, our team has reviewed your message and we are pleased to provide the following response:</p>
              <p>${result.reply_text}</p>
              <p>If you have any further questions or concerns, please do not hesitate to contact us.</p>
              <p>Best regards,</p>
              <p>${GLOBALS.APP_NAME}</p>
          </div>
          <div class="footer">
              <p>© ${require('moment')().format('YYYY')} ${GLOBALS.APP_NAME} | All Rights Reserved.</p>
          </div>
      </div>
  </body>
  </html>
  `;
  return template;

}
