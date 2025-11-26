export interface ItodoCreate{
        title: string,
        description: string,
        dueDate: date,
        status: string
}
export interface ItodoGet{
        id: number,
        title: string,
        description: string,
        dueDate: date,
        status: string,
}
