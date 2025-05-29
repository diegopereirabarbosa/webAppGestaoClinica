import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";


@Injectable({
    providedIn: 'root'
})
export class baseService<T> {
    protected baseUrl: string;
    constructor(
        protected http: HttpClient,
        baseUrl: string
    ) { 
        this.baseUrl = baseUrl;
    }

    listarTodos() {
        return this.http.get<T[]>(this.baseUrl);
    }

    obterPorId(id: number) {
        return this.http.get<T>(`${this.baseUrl}/${id}`);
    }

    criar(item: T) {
        return this.http.post<T>(this.baseUrl, item);
    }

    atualizar(id: number, item: T) {
        return this.http.put<T>(`${this.baseUrl}/${id}`, item);
    }

    excluir(id: number) {
        return this.http.delete(`${this.baseUrl}/${id}`);
    }
    
}