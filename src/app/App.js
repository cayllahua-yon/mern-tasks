//crear componentes
import React, {Component} from "react";

class App extends Component {

    constructor(){
        super();
        this.state = {
            title: '',
            description: '',
            tasks: [],
            _id: ''
        };
        this.handleChange = this.handleChange.bind(this);
        this.addTask = this.addTask.bind(this);
    }

    componentDidMount() {
        // console.log('componente fue montado')
        this.fetchTasks();
    }

    //evento
    fetchTasks(){
        fetch('/api/tasks')
            .then(res => res.json())
            .then(data =>{
                console.log(data);
                this.setState({tasks: data})
                console.log(this.state.tasks);

            })
            .catch(err => console.log(err))
    }

    editTask(id){
        fetch(`/api/tasks/${id}`)
            .then(res => res.json())
            .then(data => {   
                console.log(data);
                this.setState({
                    title: data.title,
                    description: data.description,
                    _id: data._id
                })
            })
            .catch(err => console.log(err));
    }

    deleteTask(id){
        if (confirm('Esta seguro de querer eliminar ')) {
            fetch(`/api/tasks/${id}`, {
                method: 'DELETE',
                headers: {
                    'Accept': 'application/json',
                    'Content-type': 'application/json'
                }
            })
                .then(res => res.json())
                .then(data => {
                    console.log(data);
                    M.toast({html: 'Tarea Eliminada'})
                    this.fetchTasks(); 
                })
                .catch(err => console.log(err));
        }
    }

    handleChange(e){
        const { name , value} = e.target;
        // console.log(e.target.name)
        this.setState({
            [name]: value,
        })
    }

    addTask(e){
        //editar   
        if(this.state._id){
            fetch(`/api/tasks/${this.state._id}`, {
                method: 'PUT',
                body: JSON.stringify(this.state),
                headers: {
                    'Accept': 'application/json',
                    'Content-type': 'application/json'
                }
            })
                .then(res => res.json())
                .then(data =>{
                    console.log(data);
                    M.toast({html: 'Tarea actualizado'});
                    this.setState({title: '', description:'', _id: ''});
                    this.fetchTasks(); // pedir nuevamente al servidor
                })

        } else {
        // crear o añadir una tarea
              // console.log("agrganado tarea");
        console.log(this.state);        
        //enviar una peticion al servidor - cuando lo resiva - va retornar algo - 
        fetch('/api/tasks', {
            method: 'POST',
            body: JSON.stringify(this.state),
            headers: {
                'Accept': 'application/json',
                'Content-type': 'application/json'
            }
        })
            .then(res => res.json())
            .then(data => {
                console.log();
                M.toast({html: 'Tarea guardada'});
                this.setState({title: '', description:''});
                this.fetchTasks(); // pedir nuevamente al servidor
            })
            .catch(err => console.log(err));
        // convertir a un string a un objeto
        }
        e.preventDefault();
    }


    render(){
        return (
            <div>
                {/* navegacion */}
                <nav className="light-blue darken-4">
                    <div className="container">
                        <a className="brand-logo" href="/">MERN STACK</a>
                    </div>

                </nav>

                {/* contenido */}
                <div className="container">
                    <div className="row">
                        <div className="col s5">
                            <div className="card">
                                <div className="card-content">
                                    <form onSubmit={this.addTask}>
                                        <div className="row">
                                            <div className="input-field col-s12">
                                                <input value={this.state.title} name="title" onChange={this.handleChange} type="text" placeholder="Titulo de tarea"/>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="input-field col-s12">
                                                <textarea value={this.state.description} name="description" onChange={this.handleChange} placeholder="La descripcion de la tarea" className="materialize-textarea"></textarea>
                                            </div>
                                        </div>
                                        <button type="submit" className="btn light-blue darken-4">
                                            Guardar
                                        </button>
                                    </form>
                                </div>
                            </div>
                        </div>
                        <div className="col s7">
                            <table>
                                <thead>
                                    <tr>
                                        <th>Titulo</th>
                                        <th>Descripcion</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        this.state.tasks.map(task => {
                                            return (
                                                <tr key={task._id}>
                                                    <td>{task.title}</td>
                                                    <td>{task.description}</td>
                                                    <td>
                                                        <button onClick={()=> { this.editTask(task._id)}} className="btn light-blue darken-4"><i className="material-icons">edit</i></button>
                                                        <button onClick={()=> { this.deleteTask(task._id)}} className="btn light-blue darken-4" style={{margin: '4px'}}> <i className="material-icons">delete</i></button>
                                                    </td>
                                                </tr>
                                            )
                                        })
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

            </div>
        )
    }
}

export default App;