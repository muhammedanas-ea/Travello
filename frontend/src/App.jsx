import './App.css'
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'; 
import UserRoute from './routes/UserRoute';
import AdminRoutes from './routes/AdminRoute';
import PropertyRoutes from './routes/PropertyRoute';
import ChatProvider from './components/userComponents/chat/context/ChatProvider';
import OwnerProvider from './components/propertyComponents/chat/context/ChatProvider'

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path='/*' element = {<ChatProvider><UserRoute /></ChatProvider>} />
        <Route path='/admin/*' element = {<AdminRoutes />} />
        <Route path='/property/*' element = {<OwnerProvider><PropertyRoutes /></OwnerProvider>} />
      </Routes>
    </Router>
  )
}
