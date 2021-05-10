import React, {useState, useEffect} from 'react'
import firebase from '../../config/Firebase'
import NavBar from '../../component/Molecules/NavBar'

const Dashboard = () => {

    const [firstName, setFirstName] = useState ('');
    const [lastName, setLastName] = useState ('');
    const [jurusan, setJurusan] = useState('');
    const [kelas, setKelas] = useState('');
    const [ekstrakurikuler, setEkstrakurikuler] = useState ('');
    const [product, setProduct] = useState ([]);
    const [button, setButton] = useState ("Save");
    const [selectedProduct, setSelectedProduct] = useState({});

    useEffect(() => {
        firebase.database().ref('products').on('value', (res) => {
            if(res.val()){
                //Ubah menjadi array object
                const rawData = res.val();
                const productArr = [];
                Object.keys(rawData).map(item => {
                    productArr.push({
                        id: item,
                        ...rawData[item],
                    })
                });
                setProduct(productArr);
            }
        })
    }, [])

    const resetForm = () => {
        setFirstName('');
        setLastName('');
        setJurusan('');
        setKelas('');
        setEkstrakurikuler('');
        setButton('Save');
        setSelectedProduct({});
    }

    const onSubmit = () => {
        const data = {
            firstName: firstName,
            lastName: lastName,
            jurusan: jurusan,
            kelas: kelas,
            ekstrakurikuler: ekstrakurikuler,
        }
        if(button === 'Save'){
            //Insert
            firebase.database().ref('products').push(data);
        }else {
            //Update
            firebase.database().ref(`products/${selectedProduct.id}`).set(data);
        }
        resetForm();
    }

    const onUpdateData = (item) =>{
        setFirstName(item.firstName);
        setLastName(item.lastName);
        setJurusan(item.jurusan);
        setKelas(item.kelas);
        setEkstrakurikuler(item.ekstrakurikuler);
        setButton("Update");
        setSelectedProduct(item);
    }

    const onDeleteData = (item) =>{
        //delete
        firebase.database().ref(`products/${item.id}`).remove();
    }

    return (
        <div className="container mt-5">
            <NavBar />
            <h3>Dashboard</h3>
            <div className="col-6">
            <p>First Name</p>
            <input className="form-control" placeholder="Type your first name" value={firstName} onChange={(e)=>setFirstName(e.target.value)} />
            <p>Last Name</p>
            <input className="form-control" placeholder="Type your last name" value={lastName} onChange={(e)=>setLastName(e.target.value)} />
            <p>Major</p>
            <input className="form-control" placeholder="Type your major" value={jurusan} onChange={(e)=>setJurusan(e.target.value)} />
            <p>Class</p>
            <input className="form-control" placeholder="Type your class" value={kelas} onChange={(e)=>setKelas(e.target.value)} />
            <p>Ekstrakurikuler</p>
            <input className="form-control" placeholder="Type the name Exstracurrikular" value={ekstrakurikuler} onChange={(e)=>setEkstrakurikuler(e.target.value)} />
            <br />
            <button className="btn btn-primary" onClick={onSubmit} >{button}</button>
            {
                button === 'Update' && (<button className={"btn btn-secondary"} onClick={resetForm} >Cancel Update</button>)
            }
            </div>
            <hr />
            <table class="table table-striped table-hover">
            <thead>
                <tr>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Major</th>
                    <th>Class</th>
                    <th>Ekstrakurikuler</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                {
                    product.map(item => (
                        <tr key={item.id}>
                            <td>{item.firstName}</td>
                            <td>{item.lastName}</td>
                            <td>{item.jurusan}</td>
                            <td>{item.kelas}</td>
                            <td>{item.ekstrakurikuler}</td>
                            <td>
                                <button className="btn btn-success" onClick={() => onUpdateData(item)} >Update</button>
                                <button className="btn btn-danger" onClick={() => onDeleteData(item)} >Delete</button>
                            </td>
                        </tr>
                    ))
                }
            </tbody>
            </table>
        </div>
    )
}

export default Dashboard;
