import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Cadastro from '../pages/cadastro/Cadastro'
import Login from '../pages/login/Login'
import Home from '../pages/home/Home'

const AppRoutes: React.FC = () => {
	return (
		<BrowserRouter>
			<Routes>
				<Route path='/' element={<Login />}></Route>
				<Route path='/Cadastro' element={<Cadastro />}></Route>
				<Route path='/Home' element={<Home />}></Route>
			</Routes>
		</BrowserRouter>
	)
}

export default AppRoutes
