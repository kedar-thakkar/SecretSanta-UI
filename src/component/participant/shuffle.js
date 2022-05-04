import React, { useEffect, useState } from "react";
import star from "../../assets/img/star_icon.png";
import christmas from "../../assets/img/christmas_bg.svg";
import '../../assets/style/media.css';
import { shuffleParticipants } from "../../rest/index";

const Shuffle = (props) => {
    const [pairs, setPairs] = useState([]);

    const shuffleAllParticipants = async () => {
        await shuffleParticipants()
            .then((data) => {
                setPairs([...data]);
            })
            .catch((error) => {
                console.error(error);
                setPairs([]);
            })
    }

    useEffect(() => {
        shuffleAllParticipants();
    }, []);

    return(
        <div>
            <div class="main_section main_listing_section">
                <div class="bg_right_christmas_img">
                    <img src={christmas} class="desktop_img" alt=""/>
                    <img src={star} class="mobile_img" alt=""/>
                </div>
                <div class="christmas_content_box listing_page">
                    <div class="listing_start">
                        <img src="images/star_icon.png" alt=""/>
                    </div>
                    <div class="participant_list_row">
                        <div class="title_box title_white">
                            <div class="back_arrow">
                                <a onClick={() => props.history.push("/")} class="back_svg cursor-pointer">
                                    <svg width="23" height="20" viewBox="0 0 23 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M21.4267 8.57245H4.48531L9.67056 2.34444C9.91302 2.05272 10.0297 1.67664 9.99485 1.29892C9.96002 0.921206 9.77658 0.572793 9.48486 0.330331C9.19315 0.0878688 8.81707 -0.0287806 8.43935 0.00604446C8.06163 0.0408695 7.71322 0.224317 7.47076 0.516029L0.328542 9.08669C0.28049 9.15486 0.237521 9.22648 0.199982 9.30096C0.199982 9.37238 0.199982 9.41523 0.0999913 9.48665C0.0352449 9.65044 0.00134434 9.82478 0 10.0009C0.00134434 10.177 0.0352449 10.3513 0.0999913 10.5151C0.0999913 10.5866 0.0999908 10.6294 0.199982 10.7008C0.237521 10.7753 0.28049 10.8469 0.328542 10.9151L7.47076 19.4858C7.60506 19.647 7.77325 19.7767 7.96335 19.8656C8.15346 19.9544 8.36081 20.0003 8.57066 20C8.90442 20.0006 9.22787 19.8844 9.48486 19.6715C9.62951 19.5515 9.74907 19.4043 9.83671 19.2381C9.92435 19.0719 9.97834 18.89 9.99559 18.7029C10.0128 18.5158 9.99301 18.3272 9.93723 18.1478C9.88146 17.9683 9.79084 17.8017 9.67056 17.6574L4.48531 11.4293H21.4267C21.8055 11.4293 22.1688 11.2788 22.4367 11.011C22.7046 10.7431 22.8551 10.3797 22.8551 10.0009C22.8551 9.62205 22.7046 9.25872 22.4367 8.99083C22.1688 8.72295 21.8055 8.57245 21.4267 8.57245Z" fill="white"/>
                                    </svg>
                                </a>
                            </div>
                            <h2>All Participant</h2>
                        </div>
                        {pairs && pairs.length ? (
                            <div class="participant_table">
                                <div class="participant_shuffle_title">
                                    <div class="participant_shuffle_box">
                                        <div class="participant_shuffle_left">
                                            <p>Sender</p>
                                        </div>
                                        <div class="participant_shuffle_right">
                                            <p>Receivers</p>
                                        </div>
                                    </div>
                                </div>
                                <div class="participant_shuffle">
                                    {pairs.map((senderAndReceiverPair) => (
                                        <div class="participant_shuffle_box">
                                            <div class="participant_shuffle_left">
                                                <p>{senderAndReceiverPair.sendUsername}</p>
                                            </div>
                                            <div class="participant_shuffle_center">
                                                <svg width="1136" height="224" viewBox="0 0 1136 224" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M1011.7 18.7311C1008.72 12.8331 1012 3.81707 1018.02 1.38407C1026.84 -2.18693 1025.73 -3.09594 1082.85 54.1031C1136.88 108.209 1136.63 107.908 1134.61 115.36C1133.11 120.902 1030.3 223.367 1026.08 223.53C1015.97 223.921 1010.6 219.436 1010.6 210.615C1010.6 204.813 1012.54 202.625 1053.48 162.165L1090.67 125.415H870.586C630.346 125.415 7.43341 125.834 2.71441 119.834C-1.96859 113.881 -0.428586 105.45 6.07341 101.431C9.31841 99.4261 650.505 99.4151 870.212 99.4151H1091.09L1051.95 60.1651C1030.42 38.5771 1012.31 19.9321 1011.7 18.7311Z" fill="#336960"/>
                                                </svg>
                                            </div>
                                            <div class="participant_shuffle_right">
                                                <p>{senderAndReceiverPair.receiveUsername}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ) : <div className="title_white title_box">
                                <span>No participants found.</span>
                            </div>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Shuffle;