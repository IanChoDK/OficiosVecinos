"use client";

import { useSyncExternalStore } from "react";
import mockData from "@/data/mockData.json";

export interface UserProfile {
  id: string;
  name: string;
  role: "cliente" | "prestador";
  age?: number;
  neighborhood: string;
  address: string;
  phone: string;
  notes?: string;
  category?: string;
}

export interface ServiceOffer {
  id: string;
  title: string;
  basePrice: number;
  description: string;
}

export interface Provider {
  id: string;
  name: string;
  category: string;
  secondaryCategory?: string;
  neighborhood: string;
  address: string;
  phone: string;
  rating: number;
  reviewCount: number;
  priceInfo: string;
  basePrice?: number;
  distanceKm?: number;
  availability: string;
  description: string;
  avatar: string;
  avatarUrl?: string;
  imageUrl?: string;
  gallery?: string[];
  featured?: boolean;
  verifiedBadge?: boolean;
  servicesOffered?: ServiceOffer[];
}

export interface QuoteItem {
  description: string;
  amount: number;
}

export interface ServiceQuote {
  title: string;
  items: QuoteItem[];
  total: number;
  status: "pendiente" | "aceptado" | "rechazado";
  scheduledTime?: string;
}

export interface ChatMessage {
  id: string;
  sender: "cliente" | "prestador";
  text: string;
  time: string;
  photo?: string;
  photoName?: string;
}

export interface ChatConversation {
  id: string;
  requestId: string;
  providerId: string;
  messages: ChatMessage[];
}

export interface ServiceRequest {
  id: string;
  providerId: string;
  providerName: string;
  providerCategory: string;
  providerPhone: string;
  clientName: string;
  clientNeighborhood: string;
  clientAddress: string;
  title: string;
  description: string;
  status: "pendiente" | "en_curso" | "finalizado" | "cancelado";
  date: string;
  scheduledTime?: string;
  rating?: number | null;
  comment?: string | null;
  quote?: ServiceQuote | null;
}

const STORAGE_KEYS = {
  USER: "oficios_user_session",
  ROLE: "oficios_current_role",
  PROVIDERS: "oficios_providers_list",
  REQUESTS: "oficios_requests_list",
  CHATS: "oficios_chats_list",
  ACCESSIBLE_FONT: "oficios_accessible_font",
};

export const STORAGE_EVENT = "oficios_storage_update";

function notifyChange() {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new Event(STORAGE_EVENT));
  }
}

// Inicialización de LocalStorage
export function initStorage() {
  if (typeof window === "undefined") return;

  if (!localStorage.getItem(STORAGE_KEYS.ROLE)) {
    localStorage.setItem(STORAGE_KEYS.ROLE, "cliente");
  }

  if (!localStorage.getItem(STORAGE_KEYS.USER)) {
    localStorage.setItem(
      STORAGE_KEYS.USER,
      JSON.stringify(mockData.defaultUsers.cliente)
    );
  }

  if (!localStorage.getItem(STORAGE_KEYS.PROVIDERS)) {
    localStorage.setItem(
      STORAGE_KEYS.PROVIDERS,
      JSON.stringify(mockData.providers)
    );
  }

  if (!localStorage.getItem(STORAGE_KEYS.REQUESTS)) {
    localStorage.setItem(
      STORAGE_KEYS.REQUESTS,
      JSON.stringify(mockData.initialRequests)
    );
  }

  if (!localStorage.getItem(STORAGE_KEYS.CHATS)) {
    localStorage.setItem(
      STORAGE_KEYS.CHATS,
      JSON.stringify(mockData.initialChats)
    );
  }

  const isAccessible = localStorage.getItem(STORAGE_KEYS.ACCESSIBLE_FONT) === "true";
  if (isAccessible) {
    document.documentElement.classList.add("accessible-font");
  } else {
    document.documentElement.classList.remove("accessible-font");
  }
}

// Suscripción React 19 para sincronización reactiva
function subscribe(callback: () => void) {
  if (typeof window === "undefined") return () => {};
  window.addEventListener(STORAGE_EVENT, callback);
  window.addEventListener("storage", callback);
  return () => {
    window.removeEventListener(STORAGE_EVENT, callback);
    window.removeEventListener("storage", callback);
  };
}

// Gestión de Rol
export function getStoredRole(): "cliente" | "prestador" {
  if (typeof window === "undefined") return "cliente";
  initStorage();
  const role = localStorage.getItem(STORAGE_KEYS.ROLE);
  return role === "prestador" ? "prestador" : "cliente";
}

export function setStoredRole(role: "cliente" | "prestador") {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEYS.ROLE, role);
  
  const defaultUser =
    role === "prestador"
      ? mockData.defaultUsers.prestador
      : mockData.defaultUsers.cliente;
  localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(defaultUser));

  notifyChange();
}

export function useAppRole(): "cliente" | "prestador" {
  return useSyncExternalStore(subscribe, getStoredRole, () => "cliente");
}

// Gestión de Sesión y Perfil
export function getStoredUser(): UserProfile {
  if (typeof window === "undefined") return mockData.defaultUsers.cliente as UserProfile;
  initStorage();
  const raw = localStorage.getItem(STORAGE_KEYS.USER);
  if (!raw) return mockData.defaultUsers.cliente as UserProfile;
  try {
    return JSON.parse(raw);
  } catch {
    return mockData.defaultUsers.cliente as UserProfile;
  }
}

export function updateStoredUser(data: Partial<UserProfile>): UserProfile {
  const current = getStoredUser();
  const updated = { ...current, ...data };
  if (typeof window !== "undefined") {
    localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(updated));
    notifyChange();
  }
  return updated;
}

export function useAppUser(): UserProfile {
  const raw = useSyncExternalStore(
    subscribe,
    () => {
      if (typeof window === "undefined") return JSON.stringify(mockData.defaultUsers.cliente);
      initStorage();
      return localStorage.getItem(STORAGE_KEYS.USER) || JSON.stringify(mockData.defaultUsers.cliente);
    },
    () => JSON.stringify(mockData.defaultUsers.cliente)
  );
  try {
    return JSON.parse(raw);
  } catch {
    return mockData.defaultUsers.cliente as UserProfile;
  }
}

// Gestión de Prestadores
export function getStoredProviders(): Provider[] {
  if (typeof window === "undefined") return mockData.providers as Provider[];
  initStorage();
  const raw = localStorage.getItem(STORAGE_KEYS.PROVIDERS);
  if (!raw) return mockData.providers as Provider[];
  try {
    return JSON.parse(raw);
  } catch {
    return mockData.providers as Provider[];
  }
}

export function addStoredProvider(newProvider: Omit<Provider, "id" | "rating" | "reviewCount">): Provider {
  const providers = getStoredProviders();
  const provider: Provider = {
    ...newProvider,
    id: `prov-${Date.now()}`,
    rating: 5.0,
    reviewCount: 1,
  };
  const updated = [provider, ...providers];
  if (typeof window !== "undefined") {
    localStorage.setItem(STORAGE_KEYS.PROVIDERS, JSON.stringify(updated));
    notifyChange();
  }
  return provider;
}

export function useAppProviders(): Provider[] {
  const raw = useSyncExternalStore(
    subscribe,
    () => {
      if (typeof window === "undefined") return JSON.stringify(mockData.providers);
      initStorage();
      return localStorage.getItem(STORAGE_KEYS.PROVIDERS) || JSON.stringify(mockData.providers);
    },
    () => JSON.stringify(mockData.providers)
  );
  try {
    return JSON.parse(raw);
  } catch {
    return mockData.providers as Provider[];
  }
}

// Gestión de Solicitudes y Pedidos
export function getStoredRequests(): ServiceRequest[] {
  if (typeof window === "undefined") return mockData.initialRequests as ServiceRequest[];
  initStorage();
  const raw = localStorage.getItem(STORAGE_KEYS.REQUESTS);
  if (!raw) return mockData.initialRequests as ServiceRequest[];
  try {
    return JSON.parse(raw);
  } catch {
    return mockData.initialRequests as ServiceRequest[];
  }
}

export function createStoredRequest(
  req: Omit<ServiceRequest, "id" | "status" | "date" | "rating" | "comment">
): ServiceRequest {
  const requests = getStoredRequests();
  const today = new Date();
  const dateStr = `${String(today.getDate()).padStart(2, "0")}/${String(
    today.getMonth() + 1
  ).padStart(2, "0")}/${today.getFullYear()}`;

  const newRequest: ServiceRequest = {
    ...req,
    id: `req-${Date.now()}`,
    status: "pendiente",
    date: dateStr,
    rating: null,
    comment: null,
  };

  const updated = [newRequest, ...requests];
  if (typeof window !== "undefined") {
    localStorage.setItem(STORAGE_KEYS.REQUESTS, JSON.stringify(updated));
    notifyChange();
  }
  return newRequest;
}

export function updateStoredRequestStatus(
  id: string,
  status: ServiceRequest["status"]
) {
  const requests = getStoredRequests();
  const updated = requests.map((r) => (r.id === id ? { ...r, status } : r));
  if (typeof window !== "undefined") {
    localStorage.setItem(STORAGE_KEYS.REQUESTS, JSON.stringify(updated));
    notifyChange();
  }
}

export function rateStoredRequest(id: string, rating: number, comment?: string) {
  const requests = getStoredRequests();
  let ratedProviderId: string | null = null;

  const updated = requests.map((r) => {
    if (r.id === id) {
      ratedProviderId = r.providerId;
      return { ...r, status: "finalizado" as const, rating, comment: comment || "" };
    }
    return r;
  });

  if (typeof window !== "undefined") {
    localStorage.setItem(STORAGE_KEYS.REQUESTS, JSON.stringify(updated));

    if (ratedProviderId) {
      const providers = getStoredProviders();
      const updatedProviders = providers.map((p) => {
        if (p.id === ratedProviderId) {
          const newReviewCount = p.reviewCount + 1;
          const newRating = Number(
            ((p.rating * p.reviewCount + rating) / newReviewCount).toFixed(1)
          );
          return { ...p, rating: newRating, reviewCount: newReviewCount };
        }
        return p;
      });
      localStorage.setItem(STORAGE_KEYS.PROVIDERS, JSON.stringify(updatedProviders));
    }

    notifyChange();
  }
}

export function useAppRequests(): ServiceRequest[] {
  const raw = useSyncExternalStore(
    subscribe,
    () => {
      if (typeof window === "undefined") return JSON.stringify(mockData.initialRequests);
      initStorage();
      return localStorage.getItem(STORAGE_KEYS.REQUESTS) || JSON.stringify(mockData.initialRequests);
    },
    () => JSON.stringify(mockData.initialRequests)
  );
  try {
    return JSON.parse(raw);
  } catch {
    return mockData.initialRequests as ServiceRequest[];
  }
}

// Accesibilidad: Escala de Fuente
export function getAccessibleFont(): boolean {
  if (typeof window === "undefined") return false;
  return localStorage.getItem(STORAGE_KEYS.ACCESSIBLE_FONT) === "true";
}

export function setAccessibleFont(enabled: boolean) {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEYS.ACCESSIBLE_FONT, String(enabled));
  if (enabled) {
    document.documentElement.classList.add("accessible-font");
  } else {
    document.documentElement.classList.remove("accessible-font");
  }
  notifyChange();
}

export function useAccessibleFont(): boolean {
  return useSyncExternalStore(
    subscribe,
    () => {
      if (typeof window === "undefined") return false;
      return localStorage.getItem(STORAGE_KEYS.ACCESSIBLE_FONT) === "true";
    },
    () => false
  );
}

// Gestión de Mensajes y Chats (Stitch Architecture)
export function getStoredChats(): ChatConversation[] {
  if (typeof window === "undefined") return mockData.initialChats as ChatConversation[];
  initStorage();
  const raw = localStorage.getItem(STORAGE_KEYS.CHATS);
  if (!raw) return mockData.initialChats as ChatConversation[];
  try {
    return JSON.parse(raw);
  } catch {
    return mockData.initialChats as ChatConversation[];
  }
}

export function useAppChats(): ChatConversation[] {
  const raw = useSyncExternalStore(
    subscribe,
    () => {
      if (typeof window === "undefined") return JSON.stringify(mockData.initialChats);
      initStorage();
      return localStorage.getItem(STORAGE_KEYS.CHATS) || JSON.stringify(mockData.initialChats);
    },
    () => JSON.stringify(mockData.initialChats)
  );
  try {
    return JSON.parse(raw);
  } catch {
    return mockData.initialChats as ChatConversation[];
  }
}

export function getChatByRequestId(requestId: string): ChatConversation | undefined {
  const chats = getStoredChats();
  return chats.find((c) => c.requestId === requestId);
}

export function sendChatMessage(
  requestId: string,
  sender: "cliente" | "prestador",
  text: string,
  photo?: string,
  photoName?: string
): ChatMessage {
  const chats = getStoredChats();
  const now = new Date();
  const timeStr = now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

  const newMessage: ChatMessage = {
    id: `m-${Date.now()}`,
    sender,
    text,
    time: timeStr,
    ...(photo ? { photo, photoName } : {}),
  };

  let found = false;
  const updatedChats = chats.map((chat) => {
    if (chat.requestId === requestId) {
      found = true;
      return {
        ...chat,
        messages: [...chat.messages, newMessage],
      };
    }
    return chat;
  });

  if (!found) {
    // Buscar la request correspondiente para sacar el providerId
    const requests = getStoredRequests();
    const req = requests.find((r) => r.id === requestId);
    const newChat: ChatConversation = {
      id: `chat-${requestId}`,
      requestId,
      providerId: req ? req.providerId : "prov-1",
      messages: [newMessage],
    };
    updatedChats.push(newChat);
  }

  if (typeof window !== "undefined") {
    localStorage.setItem(STORAGE_KEYS.CHATS, JSON.stringify(updatedChats));
    notifyChange();
  }

  return newMessage;
}

export function respondToQuote(
  requestId: string,
  status: "aceptado" | "rechazado"
) {
  const requests = getStoredRequests();
  const updatedRequests = requests.map((req) => {
    if (req.id === requestId && req.quote) {
      return {
        ...req,
        status: status === "aceptado" ? ("en_curso" as const) : ("cancelado" as const),
        quote: {
          ...req.quote,
          status,
        },
      };
    }
    return req;
  });

  if (typeof window !== "undefined") {
    localStorage.setItem(STORAGE_KEYS.REQUESTS, JSON.stringify(updatedRequests));

    // Agregar un mensaje automático de confirmación o ajuste en el chat
    const now = new Date();
    const timeStr = now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    const autoText =
      status === "aceptado"
        ? "✅ Presupuesto aceptado por el cliente. Turno coordinado con éxito."
        : "❌ El presupuesto fue rechazado por el cliente.";

    const chats = getStoredChats();
    const updatedChats = chats.map((chat) => {
      if (chat.requestId === requestId) {
        return {
          ...chat,
          messages: [
            ...chat.messages,
            {
              id: `m-quote-${Date.now()}`,
              sender: "cliente" as const,
              text: autoText,
              time: timeStr,
            },
          ],
        };
      }
      return chat;
    });

    localStorage.setItem(STORAGE_KEYS.CHATS, JSON.stringify(updatedChats));
    notifyChange();
  }
}

export function getProviderById(id: string): Provider | undefined {
  const providers = getStoredProviders();
  return providers.find((p) => p.id === id);
}

