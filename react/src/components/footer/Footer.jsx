import React from 'react'

import GLOBALS from '../../utils/Constant'

const Footer = () => {

    return (
        <>
            {/* <!-- Footer Start --> */}
            <footer className="footer">
                <div className="container-fluid text-center">
                    <div className="row">
                        <div className="col-md-12">
                            <strong> Copyright © {new Date().getFullYear()} {GLOBALS.APP_NAME} | All Rights Reserved </strong>
                        </div>
                    </div>
                </div>
            </footer>
            {/* <!-- end Footer --> */}
        </>
    )
}

export default Footer