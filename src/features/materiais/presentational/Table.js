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
            this.props.onDetalharMaterial(data.linha.codigo);
            this.props.history.push(`/ingrediente/detalhe/${data.linha.codigo}`);
        }

        const tHead = [
            'Material',
            'Custo',
            'Peso'
        ];
        
        let Head = tHead.map((coluna) => {
            return (<TableColumn key={coluna}>{coluna}</TableColumn>)
        });
        
        let Body;
        const materiais = this.props.listaMateriais;

        if (materiais && materiais.length > 0) {
            Body = materiais.map((linha) => {
                return (
                    <TableRow
                        key={linha.codigo}
                        onClick={selecionaritemLista.bind(this,{linha})}
                    >
                        <TableColumn>{linha.nome}</TableColumn>
                        <TableColumn>{linha.custo}</TableColumn>
                        <TableColumn>{linha.peso}</TableColumn>
                    </TableRow>
                )
            })

            return (
                <Paper
                    key={1}
                    className='paper-example'
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