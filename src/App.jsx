import './App.css'
import Counter from './components/Counter/Counter'
import Register from './components/Register/Register'
import UserList from './components/UserList/UserList'

function App() {
   return (
      <>
         <h1>ReactJs Unit Test App + Vitest</h1>
         <div className="container mx-auto p-4">
            <div className="mt-4">
               <h1>Counter</h1>
               <div className="card">
                  <Counter />
               </div>
            </div>
            <hr />
            <div className="mt-4">
               <h1>UserList</h1>
               <UserList />
            </div>
            <hr />
            <div className="mt-4">
               <h1>Register Form</h1>
               <Register />
            </div>
         </div>
      </>
   )
}

export default App
