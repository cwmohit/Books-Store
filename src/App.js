import React,{useState,useEffect} from "react";
import axios from 'axios';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import "./styles.css";

export default function App() {



const [Title, setTitle] = useState('');
const [Rating, setRating] = useState('');
const [Books, setBooks] = useState([]);
const [btn,setbtn] = useState(true);
const [editId,seteditId]=useState('')


const _refreshBooks=()=> {
  axios.get('http://localhost:3000/books').then((response) => { 
      // console.log(response.data);
      setBooks(response.data)
    });
}

useEffect(() => {
  _refreshBooks();
}, Books)

const setBook=(e)=>{
   let name = e.target.value;
   console.log(name);
   setTitle(name);
 }
const setBookRating=(e)=>{
   let name = e.target.value;
   console.log(name);
   setRating(name);
 }

 const addBook=(e)=>{
   console.log('Book Add Clicked', Title, Rating)
    // e.preventDefault();
    axios.post('http://localhost:3000/books', {title: Title,rating: Rating}).then((response) => {
      
      Books.push(response.data);
      setTitle('');
      setRating('');
      _refreshBooks();
    });
  }
  const editBook=(id,title,rating)=>{
   console.log(id,title,rating)
   seteditId(id)
 
   setTitle(title);
   setRating(rating);
   setbtn(false);
  }
  const updateBook=(id,title,rating)=>{
  console.log(id,title,rating)
    axios.put('http://localhost:3000/books/' + id, {
      title, rating
    }).then((response) => {

       setTitle('');
       setRating('');
       setbtn(true);
       _refreshBooks();
      });
  }
const deleteBook=(id)=> {
    axios.delete('http://localhost:3000/books/' + id).then((response) => {
     _refreshBooks();
     setbtn(true);
     setTitle('');
     setRating('');
    });
  }
  return (
    <div className="container ">
    <div className='mt-4 '>

    </div>
    <div className='row main'>
      <div className='col-lg-6 col-md-6 overflow-hidden m-auto'>
    
     <h1 className='my-3 text-info'>Books Store</h1>
        <div class="form-group">
          <label for="title">Book Title</label>
          <input type="text" value={Title} name='title' onChange={setBook} class="form-control" id="title" aria-describedby="title" placeholder="Book Title" />
        
        </div>
        <div class="form-group">
          <label for="rating">Rating</label>
          <input type="number" value={Rating} name='rating' onChange={setBookRating} class="form-control" id="rating" placeholder="Rating" />
        </div>
    {
      btn ? <button  onClick={addBook} class="btn btn-primary btn-block">Add</button> : <button  onClick={updateBook.bind(this,editId,Title,Rating)} class="btn btn-dark btn-block">Update</button>   
    }
     
      </div>
      <div className='col-md-6 col-lg-6 col-12 m-auto '>
        {
          Books ? 
        <table class="table table-responsive w-100">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Book Name</th>
              <th scope="col">Rating</th>
              <th scope="col">Operations</th>
            </tr>
          </thead>
          <tbody>

             {
             
              Books.map((Book)=>{
                return (
                <tr key={Book.id}>
                  <th scope="row">{Book.id}</th>
                  <td>{Book.title}</td>
                  <td>{Book.rating}</td>
                  <td className='d-flex'>
                    <button className='btn btn-info m-2' onClick={editBook.bind(this,Book.id, Book.title, Book.rating)}><EditIcon/></button>
                    <button className='btn btn-danger m-2' onClick={deleteBook.bind(this, Book.id)}><DeleteIcon/></button>
                  
                  
                  
                  </td>
                </tr>
                )
              }) 
             }



          </tbody>
        </table>  : <p>Please Wait....</p>
        }
        </div>

    </div>
    
      
     </div>
    
  );
}
