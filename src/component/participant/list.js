import React, { useEffect, useState } from "react";
import "../../assets/style/style.css";
import '../../assets/style/media.css';
import star from "../../assets/img/star_icon.png";
import christmas from "../../assets/img/christmas_bg.svg";
import { getParticipants, deleteParticipant, editParticipant } from "../../rest";
import AddParticipant from "./add";

const ParticipantList = (props) => {
    const [participants, setParticipants] = useState([]);
    const [isEdit, setIsEdit] = useState(false);
    const [editedParticipant, setEditedParticipant] = useState(null);

    const getAllParticipants = async () => {
        await getParticipants()
            .then((allParticipants) => {console.log(allParticipants); setParticipants([...allParticipants]) })
            .catch((error) => {
                console.log('error : ',participants);
                console.error(error);
                setParticipants([]);
            })
    }

    useEffect(() => {
        getAllParticipants();
    }, []);

    // Delete from participant list 
    const handleDeleteParticipant = async (id) => {
        await deleteParticipant(id)
            .then(() => alert("Participant deleted successfully."))
            .catch((error) => {
                console.error(error);
                alert("Something went wrong. Please try again.");
            })
            .finally(async () => {
                await getAllParticipants();
            });
    }

    // Edit from participant list 
    const handleEditParticipant = async (details) => {
        await editParticipant(details.id, details.name)
            .then(async () => {
                alert("Participant edited successfully.");
                await getAllParticipants();
            })
            .catch((error) => {
                console.error(error);
                alert("Something went wrong. Please try again.");
            })
            .finally(() => setIsEdit(false));
    }

    return(
        <div>
            {isEdit &&
                <AddParticipant
                    id={editedParticipant?.id || ""}
                    name={editedParticipant?.name || ""}
                    onSubmit={handleEditParticipant}
                    onClose={() => setIsEdit(false)}
                    email={editedParticipant?.emailAddress || ""}
                />
            }
            <div class="main_section main_listing_section">
                <div class="bg_right_christmas_img">
                    <img src={christmas} alt=""/>
                </div>
                <div class="christmas_content_box listing_page">
                    <div class="listing_start">
                        <img src={star} alt=""/>
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
                        {participants && participants.length ? (
                            <div class="participant_table">
                                <table>
                                    <thead>
                                        <tr>
                                            <th>No.</th>
                                            <th>Name</th>
                                            <th>Email</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {participants.map((details, index) => (
                                            <tr>
                                            <td>{index+1}</td>
                                            <td>{details.name}</td>
                                            <td>{details.emailAddress}</td>
                                            <td>
                                                <div class="action_box">
                                                    <a
                                                        onClick={() => {
                                                            setIsEdit(true);
                                                            setEditedParticipant(details);
                                                        }}
                                                        class="action_icon open_popup cursor-pointer"
                                                    >
                                                        <svg width="34" height="34" viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <path d="M23.8295 6.464L27.536 10.1687L23.8295 6.464ZM26.213 3.20025L16.1908 13.2225C15.6729 13.7396 15.3197 14.3985 15.1758 15.116L14.25 19.75L18.884 18.8225C19.6015 18.679 20.2595 18.3272 20.7775 17.8092L30.7998 7.787C31.1009 7.48583 31.3398 7.12829 31.5028 6.73479C31.6658 6.34129 31.7497 5.91954 31.7497 5.49362C31.7497 5.06771 31.6658 4.64596 31.5028 4.25246C31.3398 3.85896 31.1009 3.50142 30.7998 3.20025C30.4986 2.89908 30.141 2.66018 29.7475 2.49719C29.354 2.33419 28.9323 2.2503 28.5064 2.2503C28.0805 2.2503 27.6587 2.33419 27.2652 2.49719C26.8717 2.66018 26.5142 2.89908 26.213 3.20025V3.20025Z" stroke="#000" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"></path>
                                                            <path d="M28.25 23.25V28.5C28.25 29.4283 27.8813 30.3185 27.2249 30.9749C26.5685 31.6313 25.6783 32 24.75 32H5.5C4.57174 32 3.6815 31.6313 3.02513 30.9749C2.36875 30.3185 2 29.4283 2 28.5V9.25C2 8.32174 2.36875 7.4315 3.02513 6.77513C3.6815 6.11875 4.57174 5.75 5.5 5.75H10.75" stroke="#000" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"></path>
                                                        </svg>
                                                    </a>
                                                    <a
                                                        class="action_icon open_popup cursor-pointer"
                                                        onClick={() => handleDeleteParticipant(details.id)}
                                                    >
                                                        <svg width="20" height="21" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M10 0.75C10.8301 0.749946 11.6288 1.06755 12.2322 1.63767C12.8356 2.20779 13.198 2.98719 13.245 3.816L13.25 4H18.5C18.69 4.00006 18.8729 4.07224 19.0118 4.20197C19.1506 4.3317 19.2351 4.5093 19.248 4.69888C19.261 4.88846 19.2015 5.07589 19.0816 5.2233C18.9617 5.37071 18.7902 5.4671 18.602 5.493L18.5 5.5H17.704L16.424 18.52C16.3599 19.1691 16.0671 19.7743 15.598 20.2275C15.1289 20.6806 14.5139 20.9523 13.863 20.994L13.687 21H6.313C5.66046 21 5.02919 20.7679 4.53201 20.3453C4.03482 19.9227 3.70412 19.337 3.599 18.693L3.576 18.519L2.295 5.5H1.5C1.31876 5.49999 1.14366 5.43436 1.00707 5.31523C0.870481 5.19611 0.781648 5.03155 0.757 4.852L0.75 4.75C0.750008 4.56876 0.815643 4.39366 0.934767 4.25707C1.05389 4.12048 1.21845 4.03165 1.398 4.007L1.5 4H6.75C6.75 3.13805 7.09241 2.3114 7.7019 1.7019C8.3114 1.09241 9.13805 0.75 10 0.75ZM16.197 5.5H3.802L5.069 18.372C5.09705 18.6592 5.22362 18.9279 5.42722 19.1324C5.63082 19.3369 5.89892 19.4647 6.186 19.494L6.313 19.5H13.687C14.287 19.5 14.796 19.075 14.912 18.498L14.932 18.372L16.196 5.5H16.197ZM11.75 8.25C11.9312 8.25001 12.1063 8.31564 12.2429 8.43477C12.3795 8.55389 12.4684 8.71845 12.493 8.898L12.5 9V16C12.4999 16.19 12.4278 16.3729 12.298 16.5118C12.1683 16.6506 11.9907 16.7351 11.8011 16.748C11.6115 16.761 11.4241 16.7015 11.2767 16.5816C11.1293 16.4617 11.0329 16.2902 11.007 16.102L11 16V9C11 8.80109 11.079 8.61032 11.2197 8.46967C11.3603 8.32902 11.5511 8.25 11.75 8.25ZM8.25 8.25C8.43124 8.25001 8.60634 8.31564 8.74293 8.43477C8.87952 8.55389 8.96835 8.71845 8.993 8.898L9 9V16C8.99994 16.19 8.92776 16.3729 8.79803 16.5118C8.6683 16.6506 8.4907 16.7351 8.30112 16.748C8.11154 16.761 7.92411 16.7015 7.7767 16.5816C7.62929 16.4617 7.5329 16.2902 7.507 16.102L7.5 16V9C7.5 8.80109 7.57902 8.61032 7.71967 8.46967C7.86032 8.32902 8.05109 8.25 8.25 8.25ZM10 2.25C9.56081 2.25002 9.13768 2.41517 8.81461 2.71268C8.49154 3.01019 8.29214 3.4183 8.256 3.856L8.25 4H11.75C11.75 3.53587 11.5656 3.09075 11.2374 2.76256C10.9092 2.43437 10.4641 2.25 10 2.25Z" fill="#336960"/>
                                                        </svg>
                                                    </a>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                    </tbody>
                                </table>
                            </div>
                        ) : (
                            <div className="title_white title_box">
                                <span>No participants found.</span>
                            </div>
                        )}
                    </div>
                </div>
	        </div>
        </div>
    )
}

export default ParticipantList;