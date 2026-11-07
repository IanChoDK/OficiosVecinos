"use client";

import React, { useState } from "react";
import {
  useAppRole,
  useAppUser,
  useAppProviders,
  useAppRequests,
  setStoredRole,
  Provider,
  ServiceRequest,
} from "@/lib/storage";
import { Navbar, NavTab } from "@/components/Navbar";
import { HomeView } from "@/components/views/HomeView";
import { ServicesView } from "@/components/views/ServicesView";
import { ProfileView } from "@/components/views/ProfileView";
import { ContactModal } from "@/components/ContactModal";
import { RatingModal } from "@/components/RatingModal";
import { CreateServiceModal } from "@/components/CreateServiceModal";

export default function Home() {
  const [currentTab, setCurrentTab] = useState<NavTab>("inicio");
  const role = useAppRole();
  const user = useAppUser();
  const providers = useAppProviders();
  const requests = useAppRequests();

  // Estados de Modales y Navegación
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [contactProvider, setContactProvider] = useState<Provider | null>(null);
  const [ratingRequest, setRatingRequest] = useState<ServiceRequest | null>(null);
  const [isCreateServiceOpen, setIsCreateServiceOpen] = useState(false);

  const handleSelectCategoryFromHome = (categoryName: string) => {
    setSelectedCategory(categoryName);
    setCurrentTab("servicios");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleContactProvider = (provider: Provider) => {
    setContactProvider(provider);
  };

  const handleRateRequest = (request: ServiceRequest) => {
    setRatingRequest(request);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#f8fafc]">
      {/* Navegación y Cabecera */}
      <Navbar
        currentTab={currentTab}
        onTabChange={(tab) => {
          setCurrentTab(tab);
          window.scrollTo({ top: 0, behavior: "smooth" });
        }}
        role={role}
        onRoleChange={(newRole) => {
          setStoredRole(newRole);
        }}
      />

      {/* Contenedor Principal SPA */}
      <main className="flex-1 max-w-4xl mx-auto px-4 pt-5 pb-8 w-full">
        {currentTab === "inicio" && (
          <HomeView
            role={role}
            providers={providers}
            onSelectCategory={handleSelectCategoryFromHome}
            onContactProvider={handleContactProvider}
            onOpenCreateService={() => setIsCreateServiceOpen(true)}
            onNavigateToServices={() => {
              setSelectedCategory("");
              setCurrentTab("servicios");
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
          />
        )}

        {currentTab === "servicios" && (
          <ServicesView
            role={role}
            providers={providers}
            initialCategory={selectedCategory}
            onContactProvider={handleContactProvider}
            onOpenCreateService={() => setIsCreateServiceOpen(true)}
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
      </main>

      {/* Modales Accesibles de la Aplicación */}
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
