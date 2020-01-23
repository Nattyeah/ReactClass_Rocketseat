import React, {Component} from 'react';
import api from '../../services/api';
import { Link } from 'react-router-dom';

import './styles.css';

export default class Main extends Component {
    //Sempre que houver uma váriavel dentro do state o método render() ficará escutando qualquer atualização para trazer qualquer alteração para tela
    state = {
        products: [],
        productsInfo: {},
        page: 1,
    }
    
    componentDidMount() {
        //Sempre que precisar executar uma ação logo que o componente é exibido em tela, usar o DidMount()
    this.loadProducts();
    }

    loadProducts = async (page = 1) => {
    const response = await api.get(`/products?page=${page}`)

        const {docs, ...productsInfo } = response.data;

        this.setState({ products: docs, productsInfo, page })

    }

    prevPage = () => {
        const { page, productsInfo } = this.state
        
        if (page === 1) return;

        const pageNumber = page - 1;

        this.loadProducts(pageNumber)
    }

    nextPage = () => {
        const { page, productsInfo } = this.state
        
        if (page === productsInfo.pages) return;

        const pageNumber = page + 1;

        this.loadProducts(pageNumber)
    }

    render () {
        const {products, page, productsInfo} = this.state;

    return (
        <div className="product-list">
        {products.map(product => (
            <article key={product._id}>
        <strong>{product.title}</strong>
        <p>{product.description}</p>
        
        {/* // eslint-disable-next-line */}

        <Link to={`/products/${product._id}`}>Acessar</Link>
        </article>
        ))}
        <div className="actions">
            <button disabled={page === 1} onClick={this.prevPage}>Anterior</button>
            <button disabled={page === productsInfo.page} onClick={this.nextPage}>Próxima</button>
        </div>
    </div>
    )
    }
}