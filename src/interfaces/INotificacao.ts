export enum TipoNotificacao {
    SUCESSO,
    FALHA,
    ATENCAO
}
export interface INotificacao {
    titulo: String
    texto: String
    tipo: TipoNotificacao
    id: Number
}