import axios from 'axios'

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api'

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 60000
})

export interface TitleRequest {
  topic: string
  industry: string
  style: string
}

export interface TitleResponse {
  success: boolean
  data: string[]
}

export interface ScriptRequest {
  topic: string
  type: string
  duration: string
}

export interface ScriptResponse {
  success: boolean
  data: string
}

export interface ProductRequest {
  name: string
  features: string
}

export interface ProductResponse {
  success: boolean
  data: {
    selling_points: string[]
    ad_copy: string
    seo_description: string
  }
}

export async function generateTitle(request: TitleRequest): Promise<TitleResponse> {
  const response = await api.post('/title', request)
  return response.data
}

export async function generateScript(request: ScriptRequest): Promise<ScriptResponse> {
  const response = await api.post('/script', request)
  return response.data
}

export async function generateProduct(request: ProductRequest): Promise<ProductResponse> {
  const response = await api.post('/product', request)
  return response.data
}
