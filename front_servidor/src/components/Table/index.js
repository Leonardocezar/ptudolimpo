import React from "react";
import MaterialTable from "material-table";

export default function Table({
  columns,
  data,
  title,
  actions,
  actionsPosition,
}) {
  return (
    <MaterialTable
      columns={columns}
      data={data}
      title={title}
      options={{
        pageSize: 20,
        pageSizeOptions: [5, 20, 50, 100],
        search: true,
        actionsColumnIndex: actionsPosition,
        detailPanelColumnAlignment: "right",
      }}
      localization={{
        header: {
          actions: "Ações",
        },
        body: {
          emptyDataSourceMessage: "Não há dados a serem exibidos",
        },
        toolbar: {
          searchTooltip: "Pesquisar",
          searchPlaceholder: "Pesquisar",
        },
        pagination: {
          labelRowsSelect: "Linhas",
          labelRowsPerPage: "Linhas por Página",
          firstAriaLabel: "Primeira Página",
          firstTooltip: "Primeira Página",
          previousAriaLabel: "Página Anterior",
          previousTooltip: "Página Anterior",
          nextAriaLabel: "Próxima Página",
          nextTooltip: "Próxima Página",
          lastAriaLabel: "Última Página",
          lastTooltip: "Última Página",
          labelDisplayedRows: "{from}-{to} de {count}",
        },
      }}
      actions={actions}
    />
  );
}
