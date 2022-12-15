import {React, Component} from "react";
import Main from "../templates/Main.jsx";
import axios from "axios";

const headerProps = {
    icon: 'users',
    title: 'Usuários',
    subtitle: 'Banco de Dados da Empresa',
}

const baseUrl = "http://localhost:3001/users";

const initialState = {
    user: {email: '', senha: ''},
    list: []
}
export default class UserCrud extends Component{
    state = {...initialState}
    
    componentDidMount() {
        axios(baseUrl).then(resp => {
            this.setState({list: resp.data})
        })
    }

    clear() {
        this.setState({user: initialState.user})
    }
    save() {
        const user = this.state.user
        const method = user.id ? 'put' : 'post'
        const url = user.id ? `${baseUrl}/${user.id}` : baseUrl
        const input = document.querySelectorAll("input")
        const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/

        if (user.email === '' || user.senha === '' || emailRegex.test(user.email) == false) {
             input.forEach(e => e.style.border = "solid red 1px")

             setTimeout(() => {
                input.forEach(e => e.style.border = "solid #ced4da 0.2px")
            }, 2000);

        }else if(emailRegex.test(user.email)){
                axios[method](url, user)
                .then(resp => {
                    const list = this.getUpdatedList(resp.data)
                    this.setState({ user: initialState.user, list})
                })  
        }

    }
    Event = window.addEventListener("keypress", (e) => e.key == "Enter" ? document.querySelectorAll("input").forEach(e =>{
        e.style.border = "solid #ced4da 0.2px"
    }) : false)

    getUpdatedList(user) {
        const list = this.state.list.filter(u => u.id !== user.id)
        list.unshift(user)
        return list
    }
    updateField(event){
        const user = {...this.state.user}
        user[event.target.name] = event.target.value
        this.setState({ user })
    }
    renderForm() {
        return(
            <form>
            <div className="form">
                <div className="row">
                    <div className="col-12 col-md-6">
                        <div className="form-group">
                            <label>Email</label>
                            <input type="email" className="form-control" 
                            name="email"
                            value={this.state.user.email}
                            onChange= {e => this.updateField(e)}
                            placeholder="Digite um email..."
                            />
                        </div>
                    </div>
                    <div className="col-12 col-md-6">
                        <div className="form-group">
                            <label>Senha</label>
                            <input type="password" className="form-control" 
                            name="senha"
                            value={this.state.user.senha}
                            onChange={e => this.updateField(e)}
                            placeholder="Digite uma senha..."
                            />
                        </div>
                    </div>
                </div>
                <hr />
                <div className="row">
                    <div className="col-12 d-flex justify-content-end">
                        <button className="btn btn-primary"
                        onClick={e => (this.save(e), e.preventDefault())}>
                            Salvar
                        </button>
                        <button className="btn btn-secondary.ml-2"
                        onClick={e => (this.clear(e), e.preventDefault())}>
                            Cancelar
                        </button>
                    </div>
                </div>
            </div>
            </form>
        )
    }

    load(user){
        this.setState({ user })
    }

    remove(user){
        axios.delete(`${baseUrl}/${user.id}`)
        .then(resp =>{
            const list = this.state.list.filter(u => u !== user)
            this.setState({ list })
        })
    }
    renderTable() {
        return(
            <table className="table mt-4">
                <thead>
                    <tr>
                        <th>Email</th>
                        <th>Senha</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {this.renderRows()}
                </tbody>
            </table>
        )
    }

    renderRows() {
        return this.state.list.map(user => {
            return(
                <tr key={user.id}>
                    <td>{user.email}</td>
                    <td>{user.senha}</td>
                    <td>
                        <button className="btn btn-warning"
                        onClick={() => this.load(user)}>
                            <i className="fa fa-pencil"></i>
                        </button>
                        <button className="btn btn-danger ml-2"
                        onClick={() => this.remove(user)}>
                            <i className="fa fa-trash"></i>
                        </button>
                    </td>
                </tr>
            )
        })
    }

    render(){
    return(
        <Main {...headerProps}>
            {this.renderForm()}
            {this.renderTable()} 
        </Main>
    )
    }
}