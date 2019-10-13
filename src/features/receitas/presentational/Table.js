import React, { Component } from 'react';
import DataTable from 'react-md/lib/DataTables/DataTable';
import TableHeader from 'react-md/lib/DataTables/TableHeader';
import TableBody from 'react-md/lib/DataTables/TableBody';
import TableRow from 'react-md/lib/DataTables/TableRow';
import TableColumn from 'react-md/lib/DataTables/TableColumn';
import Paper from 'react-md/lib/Papers';

export class TableF extends Component {

    render() {

        const selecionaritemLista = (data) => {
            this.props.onDetalharReceita(data.linha);
            this.props.history.push(`/receita/detalhe/${data.linha.codigo}`);
        }

        const tHead = [
            'Nome',
            'Rendimento',
            'Valor de venda'
        ];
        
        let Head; 
        let Body;

        const receitas = this.props.listaReceitas;

        if (receitas && receitas.length > 0) {

            Head = tHead.map((coluna) => {
                return (<TableColumn key={coluna}>{coluna}</TableColumn>)
            });

            Body = receitas.map((linha) => {
                return (
                    <TableRow
                        key={linha.codigo}
                        onClick={selecionaritemLista.bind(this,{linha})}
                    >
                        <TableColumn>{linha.nome}</TableColumn>
                        <TableColumn>{linha.rendimento}</TableColumn>
                        <TableColumn>{linha.valorVenda}</TableColumn>
                    </TableRow>
                )
            });

            return (
                <Paper
                    key={1}
                >
                    <DataTable plain>
                        <TableHeader>
                            <TableRow>
                                {Head}
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {Body}
                        </TableBody>
                    </DataTable>
                </Paper>
            );
            
        }

        return null;
    }
}