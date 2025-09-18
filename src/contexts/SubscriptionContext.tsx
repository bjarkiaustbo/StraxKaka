'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface Employee {
  id: string;
  name: string;
  birthday: string;
  cakeType: string;
  cakeSize: string;
  dietaryRestrictions: string;
  specialNotes: string;
}

export interface Company {
  id: string;
  companyName: string;
  contactPersonName: string;
  contactEmail: string;
  contactPhone: string;
  deliveryAddress: string;
  subscriptionTier: SubscriptionTier;
  subscriptionStatus: SubscriptionStatus;
  subscriptionStartDate?: string;
  subscriptionEndDate?: string;
  monthlyCost: number;
  employeeCount: number;
  dateCreated: string;
}

export type SubscriptionTier = 'small' | 'medium' | 'large' | 'enterprise';
export type SubscriptionStatus = 'pending_payment' | 'active' | 'expired';

export interface SubscriptionPricing {
  tier: SubscriptionTier;
  name: string;
  minEmployees: number;
  maxEmployees: number;
  basePrice: number;
  pricePerEmployee: number;
  description: string;
}

export const SUBSCRIPTION_PRICING: SubscriptionPricing[] = [
  {
    tier: 'small',
    name: 'Small',
    minEmployees: 1,
    maxEmployees: 5,
    basePrice: 3000,
    pricePerEmployee: 0,
    description: 'Perfect for small teams'
  },
  {
    tier: 'medium',
    name: 'Medium',
    minEmployees: 6,
    maxEmployees: 10,
    basePrice: 5000,
    pricePerEmployee: 0,
    description: 'Ideal for growing companies'
  },
  {
    tier: 'large',
    name: 'Large',
    minEmployees: 11,
    maxEmployees: 20,
    basePrice: 10000,
    pricePerEmployee: 0,
    description: 'Great for established businesses'
  },
  {
    tier: 'enterprise',
    name: 'Enterprise',
    minEmployees: 21,
    maxEmployees: 999,
    basePrice: 0,
    pricePerEmployee: 0,
    description: 'Custom pricing for large organizations'
  }
];

interface SubscriptionContextType {
  companies: Company[];
  employees: Employee[];
  currentCompany: Company | null;
  addCompany: (company: Omit<Company, 'id' | 'dateCreated'>) => string;
  updateCompany: (id: string, updates: Partial<Company>) => void;
  addEmployee: (employee: Omit<Employee, 'id'>) => string;
  addEmployees: (employees: Omit<Employee, 'id'>[]) => string[];
  removeEmployee: (id: string) => void;
  updateEmployee: (id: string, updates: Partial<Employee>) => void;
  getEmployeesByCompany: (companyId: string) => Employee[];
  calculateSubscriptionCost: (employeeCount: number) => { tier: SubscriptionTier; cost: number };
  updateSubscriptionStatus: (companyId: string, status: SubscriptionStatus) => void;
  isHydrated: boolean;
}

const SubscriptionContext = createContext<SubscriptionContextType | undefined>(undefined);

export function SubscriptionProvider({ children }: { children: ReactNode }) {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    // Load data from localStorage (only in browser)
    if (typeof window !== 'undefined') {
      try {
        const storedCompanies = localStorage.getItem('straxkaka_companies');
        const storedEmployees = localStorage.getItem('straxkaka_employees');
        
        if (storedCompanies) {
          setCompanies(JSON.parse(storedCompanies));
        }
        if (storedEmployees) {
          setEmployees(JSON.parse(storedEmployees));
        }
      } catch (error) {
        console.error('Error loading data from localStorage:', error);
      }
    }
    
    setIsHydrated(true);
  }, []);

  useEffect(() => {
    if (isHydrated && typeof window !== 'undefined') {
      try {
        localStorage.setItem('straxkaka_companies', JSON.stringify(companies));
        localStorage.setItem('straxkaka_employees', JSON.stringify(employees));
      } catch (error) {
        console.error('Error saving data to localStorage:', error);
      }
    }
  }, [companies, employees, isHydrated]);

  const calculateSubscriptionCost = (employeeCount: number) => {
    const pricing = SUBSCRIPTION_PRICING.find(p => 
      employeeCount >= p.minEmployees && employeeCount <= p.maxEmployees
    );
    
    if (!pricing) {
      return { tier: 'enterprise' as SubscriptionTier, cost: 0 };
    }
    
    return { tier: pricing.tier, cost: pricing.basePrice };
  };

  const addCompany = (companyData: Omit<Company, 'id' | 'dateCreated'>) => {
    const id = Date.now().toString();
    const newCompany: Company = {
      ...companyData,
      id,
      dateCreated: new Date().toISOString()
    };
    
    setCompanies(prev => [...prev, newCompany]);
    return id;
  };

  const updateCompany = (id: string, updates: Partial<Company>) => {
    setCompanies(prev => 
      prev.map(company => 
        company.id === id ? { ...company, ...updates } : company
      )
    );
  };

  const addEmployee = (employeeData: Omit<Employee, 'id'>) => {
    const id = Date.now().toString() + Math.random().toString(36).substr(2, 9);
    const newEmployee: Employee = {
      ...employeeData,
      id
    };
    
    setEmployees(prev => [...prev, newEmployee]);
    return id;
  };

  const addEmployees = (employeesData: Omit<Employee, 'id'>[]) => {
    const newEmployees: Employee[] = employeesData.map(employeeData => ({
      ...employeeData,
      id: Date.now().toString() + Math.random().toString(36).substr(2, 9)
    }));
    
    setEmployees(prev => [...prev, ...newEmployees]);
    return newEmployees.map(emp => emp.id);
  };

  const removeEmployee = (id: string) => {
    setEmployees(prev => prev.filter(emp => emp.id !== id));
  };

  const updateEmployee = (id: string, updates: Partial<Employee>) => {
    setEmployees(prev => 
      prev.map(employee => 
        employee.id === id ? { ...employee, ...updates } : employee
      )
    );
  };

  const getEmployeesByCompany = (companyId: string) => {
    return employees.filter(emp => emp.id.startsWith(companyId));
  };

  const updateSubscriptionStatus = (companyId: string, status: SubscriptionStatus) => {
    const now = new Date().toISOString();
    const updates: Partial<Company> = { subscriptionStatus: status };
    
    if (status === 'active') {
      updates.subscriptionStartDate = now;
      updates.subscriptionEndDate = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString();
    }
    
    updateCompany(companyId, updates);
  };

  const currentCompany = companies.length > 0 ? companies[companies.length - 1] : null;

  return (
    <SubscriptionContext.Provider value={{
      companies,
      employees,
      currentCompany,
      addCompany,
      updateCompany,
      addEmployee,
      addEmployees,
      removeEmployee,
      updateEmployee,
      getEmployeesByCompany,
      calculateSubscriptionCost,
      updateSubscriptionStatus,
      isHydrated
    }}>
      {children}
    </SubscriptionContext.Provider>
  );
}

export function useSubscription() {
  const context = useContext(SubscriptionContext);
  if (context === undefined) {
    throw new Error('useSubscription must be used within a SubscriptionProvider');
  }
  return context;
}

