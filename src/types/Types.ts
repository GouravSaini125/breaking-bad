export type Character = {
    appearance: number[],
    better_call_saul_appearance: number[]
    birthday: string,
    category: string,
    char_id: number,
    img: string,
    name: string,
    nickname: string,
    occupation: string[],
    portrayed: string,
    status: string,
    quotes?: string[]
}

export enum REQUEST_STATUS {
    LOADING,
    ERROR,
    SUCCEED,
}

export enum CATEGORY {
    ALL,
    BB,
    BCS,
}

export type Filter = {
    category?: CATEGORY,
    name?: string,
}