import axios from 'axios';

export interface Product {
  id: number;
  images: string[];
  properties: string[];
  title: string;
  regularPrice: string;
}

const API_URL = 'http://localhost:3001/api';

export const getProducts = async (): Promise<Product[]> => {
  try {
    const response = await axios.get<Product[]>(`${API_URL}/products`);
    return response.data;
  } catch (error) {
    console.error('Erreur lors de la récupération des produits:', error);
    throw error;
  }
};

export const getProductById = async (id: number): Promise<Product> => {
  try {
    const response = await axios.get<Product>(`${API_URL}/product/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Erreur lors de la récupération du produit avec l'ID ${id}:`, error);
    throw error;
  }
};