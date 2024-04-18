import './App.css'
import Counter from './components/Counter/Counter'
import UserList from './components/UserList/UserList'

function App() {
   return (
      <>
         <h1>ReactJs Unit Test App + Vitest</h1>
         <div className="container mx-auto p-4">
            <div>
               <h1>Counter</h1>
               <div className="card">
                  <Counter />
               </div>
            </div>
            <hr />
            <div>
               <UserList />
            </div>
         </div>
      </>
   )
}

export default App
