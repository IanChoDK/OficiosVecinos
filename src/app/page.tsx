"use client";

import React, { useState } from "react";
import {
  useAppRole,
  useAppUser,
  useAppProviders,
  useAppRequests,
  setStoredRole,
  sendChatMessage,
  Provider,
  ServiceRequest,
} from "@/lib/storage";
import { Navbar, NavTab } from "@/components/Navbar";
import { HomeView } from "@/components/views/HomeView";
import { ServicesView } from "@/components/views/ServicesView";
import { ProfileView } from "@/components/views/ProfileView";
import { ProviderDetailView } from "@/components/views/ProviderDetailView";
import { ChatView } from "@/components/views/ChatView";
import { ContactModal } from "@/components/ContactModal";
import { RatingModal } from "@/components/RatingModal";
import { CreateServiceModal } from "@/components/CreateServiceModal";
import { ContractingFormModal } from "@/components/ContractingFormModal";

export default function Home() {
  const [currentTab, setCurrentTab] = useState<NavTab>("inicio");
  const role = useAppRole();
  const user = useAppUser();
  const providers = useAppProviders();
  const requests = useAppRequests();

  // Estados de Navegación y Pantallas Detalladas
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [selectedDetailProvider, setSelectedDetailProvider] = useState<Provider | null>(null);
  const [activeChatProvider, setActiveChatProvider] = useState<Provider | null>(null);
  const [activeChatRequest, setActiveChatRequest] = useState<ServiceRequest | null>(null);

  // Estados de Modales
  const [contractingProvider, setContractingProvider] = useState<Provider | null>(null);
  const [contactProvider, setContactProvider] = useState<Provider | null>(null);
  const [ratingRequest, setRatingRequest] = useState<ServiceRequest | null>(null);
  const [isCreateServiceOpen, setIsCreateServiceOpen] = useState(false);

  // Navegación desde Home
  const handleSelectCategoryFromHome = (categoryName: string) => {
    setSelectedCategory(categoryName);
    setSelectedDetailProvider(null);
    setCurrentTab("servicios");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Abrir Ficha Detalle del Profesional
  const handleSelectProvider = (provider: Provider) => {
    setSelectedDetailProvider(provider);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Iniciar Chat con Prestador
  const handleStartChatWithProvider = (provider: Provider) => {
    setActiveChatProvider(provider);
    const relatedRequest = requests.find((r) => r.providerId === provider.id) || null;
    setActiveChatRequest(relatedRequest);
    setSelectedDetailProvider(null);
    setCurrentTab("chat");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Enviar mensaje rápido desde el detalle del profesional
  const handleSendQuickMessage = (provider: Provider, messageText: string) => {
    const relatedRequest = requests.find((r) => r.providerId === provider.id);
    const reqId = relatedRequest ? relatedRequest.id : `req-quick-${Date.now()}`;
    sendChatMessage(reqId, "cliente", messageText);

    setActiveChatProvider(provider);
    setActiveChatRequest(relatedRequest || null);
    setSelectedDetailProvider(null);
    setCurrentTab("chat");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Abrir modal de contratación directa
  const handleStartContracting = (provider: Provider) => {
    setContractingProvider(provider);
  };

  // Calificar servicio concluido
  const handleRateRequest = (request: ServiceRequest) => {
    setRatingRequest(request);
  };

  // Cambio de Tab principal
  const handleTabChange = (tab: NavTab) => {
    setSelectedDetailProvider(null);
    setCurrentTab(tab);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const currentProviderForChat =
    activeChatProvider ||
    (providers.length > 0 ? providers[0] : null);

  return (
    <div className="min-h-screen flex flex-col bg-[#F9F9FA]">
      {/* Navegación Superior y Conmutador de Rol */}
      <Navbar
        currentTab={currentTab}
        onTabChange={handleTabChange}
        role={role}
        onRoleChange={(newRole) => {
          setStoredRole(newRole);
        }}
      />

      {/* Contenedor Principal SPA Reactiva */}
      <main className="flex-1 max-w-4xl mx-auto px-4 pt-5 pb-8 w-full">
        {/* Vista Condicional: Detalle de Profesional */}
        {selectedDetailProvider ? (
          <ProviderDetailView
            provider={selectedDetailProvider}
            onBack={() => setSelectedDetailProvider(null)}
            onSelectPro={(p) => handleStartContracting(p)}
            onSendQuickMessage={handleSendQuickMessage}
          />
        ) : (
          <>
            {currentTab === "inicio" && (
              <HomeView
                role={role}
                providers={providers}
                onSelectCategory={handleSelectCategoryFromHome}
                onContactProvider={handleStartChatWithProvider}
                onSelectProvider={handleSelectProvider}
                onOpenCreateService={() => setIsCreateServiceOpen(true)}
                onNavigateToServices={() => {
                  setSelectedCategory("");
                  setCurrentTab("servicios");
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                onNavigateToTab={handleTabChange}
              />
            )}

            {currentTab === "servicios" && (
              <ServicesView
                role={role}
                providers={providers}
                initialCategory={selectedCategory}
                onContactProvider={handleStartChatWithProvider}
                onSelectProvider={handleSelectProvider}
                onOpenCreateService={() => setIsCreateServiceOpen(true)}
              />
            )}

            {currentTab === "chat" && currentProviderForChat && (
              <ChatView
                provider={currentProviderForChat}
                request={activeChatRequest || requests[0] || null}
                onBack={() => setCurrentTab("inicio")}
              />
            )}

            {currentTab === "perfil" && (
              <ProfileView
                user={user}
                requests={requests}
                role={role}
                onRateRequest={handleRateRequest}
                onRefreshData={() => {}}
              />
            )}
          </>
        )}
      </main>

      {/* Modales y Flujos de Diálogo Accesibles */}
      <ContractingFormModal
        provider={contractingProvider}
        isOpen={Boolean(contractingProvider)}
        onClose={() => setContractingProvider(null)}
        onSuccess={(newReqId) => {
          setContractingProvider(null);
          setSelectedDetailProvider(null);
          const newReq = requests.find((r) => r.id === newReqId);
          if (newReq && contractingProvider) {
            setActiveChatProvider(contractingProvider);
            setActiveChatRequest(newReq);
            setCurrentTab("chat");
          } else {
            setCurrentTab("perfil");
          }
        }}
      />

      <ContactModal
        provider={contactProvider}
        isOpen={Boolean(contactProvider)}
        onClose={() => setContactProvider(null)}
        onSuccess={() => {
          setCurrentTab("perfil");
        }}
      />

      <RatingModal
        request={ratingRequest}
        isOpen={Boolean(ratingRequest)}
        onClose={() => setRatingRequest(null)}
        onSuccess={() => {}}
      />

      <CreateServiceModal
        isOpen={isCreateServiceOpen}
        onClose={() => setIsCreateServiceOpen(false)}
        onSuccess={() => {
          setCurrentTab("servicios");
        }}
      />
    </div>
  );
}
