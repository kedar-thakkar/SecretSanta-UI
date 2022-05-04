import React, { useState } from "react";
import '../../assets/style/media.css';
import "../../assets/style/style.css";
import { EMAIL_REGEX ,Name_REGEX} from "../../constants";
const AddParticipant = (props) => {
	const [name, setName] = useState(props.name || "");
	const [email, setEmail] = useState(props.email || ""); 
	const [emailerror,setemailerror] = useState(props);
	const validateDisable = (
		name.toString().trim() === "" || !EMAIL_REGEX.test(email)
		|| !Name_REGEX.test(name)
	);
    return(
        <div id="add_participants" class="white-popup-block mfp-hide">
		<div class="add_participants">
			<a class="popup-modal-dismiss close_icon cursor-pointer" onClick={props.onClose}>
				<svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
					<path d="M11 1L1 11M1 1L11 11" stroke="#656185" strokeWidth="1.5"></path>
				</svg>
			</a>
			<div class="hedding_title">
				<h2>{`${props.add ? 'Add' : 'Edit'} Participant`}</h2>
			</div>
			<div class="participant_input_box">
				<div class="input_box">
					<input value={name} onChange={(e) => setName(e.target.value)} type="text" placeholder="Name"/>
					{name!=="" &&!Name_REGEX.test(name)&& <span style={{color:"red"}}>Only letters allowed.</span>}
				</div>
				<div class="input_box">
					<input disabled={!props.add} value={email} onChange={(e) => setEmail(e.target.value)} type="Email" placeholder="Email" type="email" />
					{email.toString().trim() !== "" && !EMAIL_REGEX.test(email) && <span style={{color:"red"}} >Please enter valid email.</span>}
				</div>
				{props.Emailerror&&
					<div>
						<span style={{color:"red"}}> Email id already registered.</span>
					</div> 
				}
				<div class="input_box">
					<div class="btn submit_btn">
						<a
							onClick={() => props.onSubmit({
								name,
								email,
								id: props.id || null,
							})}
							class={`a_btn cursor-pointer ${validateDisable ? 'btn-disbled': ''}`}
						>
							{props.add ? 'Add' : 'Edit'}
						</a>
					</div>
				</div>
			</div>
		</div>
	</div>
    )
}

export default AddParticipant;