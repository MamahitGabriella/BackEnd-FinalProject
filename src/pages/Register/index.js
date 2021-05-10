import React, {useState} from 'react'
import firebase from '../../config/Firebase'
import {useHistory, NavLink} from 'react-router-dom'

const Register  = () => {

    const [email, setEmail] = useState ('');
    const [password, setPassword] = useState ('');
    const [fullName, setFullName] = useState ('');
    const [noHp, setNoHP] = useState ('');
    
    let history = useHistory();

    const onSubmit = () => {

        const data = {
            email: email,
            fullName : fullName,
            noHp : noHp,
        };

        firebase.auth().createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
        // simpan ke realtime database
        const userId = userCredential.user.uid;
        firebase.database().ref('users/' + userId).set(data);
        setFullName('');
        setNoHP('');
        setEmail('');
        setPassword('');
        //redirect ke login 
        history.push("/");
        })
        .catch((error) => {
        console.log(error);
        // tampilkan pesan error
        });
    };
    

    return (
        <div className="container mt-4">
            <h3>Register</h3>
            <p className="form-label mt-3  ">Nama Lengkap</p>
            <input className="form-control mt-4" placeholder="Type the full name" value={fullName} onChange={(e) => setFullName(e.target.value)} />
            <p className="form-label mt-3  ">No HP</p>
            <input className="form-control mt-4" placeholder="Type the phone number" value={noHp} onChange={(e) => setNoHP(e.target.value)} />
            <p className="form-label mt-3  ">Email</p>
            <input className="form-control mt-4" placeholder="Type the email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <p className="form-label mt-3 ">Password</p>
            <input className="form-control mt-4" type="Type the password" placeholder="Masukkan password" value={password} onChange={(e) => setPassword(e.target.value)} /> 
            <br />
            <br />
            <button type="button" onClick={onSubmit} className="btn btn-primary" >Register New User</button>
            <br />
            <br />
            Have account?
            <NavLink activeClassName="active" to="/" >
            click here
            </NavLink>
        </div>
    )
}

export default Register; 
