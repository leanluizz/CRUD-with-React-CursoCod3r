import React from "react";
import Main from "../templates/Main.jsx";

export default props => {
    return (
        <Main
            icon="home"
            title="Início"
            subtitle="CRUD completo usando React">
            <div className='display-4'>Bem vindo</div>
            <hr />
            <p className='mb-0'> Sistema para exempificar a construção de um cadastro Desenvolvido em React!</p>
        </Main>
    )
}