import React from 'react';
import styled from 'styled-components';

interface DealStageBadgeProps {
  stage: string;
  dealType: 'B2B' | 'B2C';
}

const StageBadge = styled.span<DealStageBadgeProps>`
  padding: 6px 12px;
  border-radius: 16px;
  font-size: 14px;
  font-weight: 600;
  text-transform: uppercase;
  background: ${props => {
    // Common stages for both B2B and B2C
    switch(props.stage) {
      case 'prospection': return '#e0e0e0';
      case 'qualification': return '#fff9c4';
      case 'contact': return '#ffecb3';
      case 'discovery': return '#ffe0b2';
      case 'proposal': return '#ffcc80';
      case 'negotiation': return '#ffb74d';
      case 'closing': return '#f57c00';
      case 'delivery': return '#81c784';
      case 'upsell': return '#388e3c';
      default: return '#bdbdbd';
    }
  }};
  color: ${props => {
    // Different color logic for B2B vs B2C if needed
    if (props.dealType === 'B2C' && props.stage === 'upsell') {
      return '#ffffff';
    }
    
    switch(props.stage) {
      case 'prospection': return '#616161';
      case 'qualification': return '#5d4037';
      case 'contact': return '#5d4037';
      case 'discovery': return '#5d4037';
      case 'proposal': return '#5d4037';
      case 'negotiation': return '#5d4037';
      case 'closing': return '#ffffff';
      case 'delivery': return '#1b5e20';
      case 'upsell': return props.dealType === 'B2B' ? '#1b5e20' : '#ffffff';
      default: return '#616161';
    }
  }};
`;

const DealStageBadge: React.FC<DealStageBadgeProps> = ({ stage, dealType }) => {
  // Convert stage key to display text
  const stageDisplayText = {
    'prospection': 'Prospection',
    'qualification': 'Qualification',
    'contact': 'Prise de contact',
    'discovery': 'Découverte',
    'proposal': 'Proposition de valeur',
    'negotiation': 'Négociation',
    'closing': 'Closing',
    'delivery': 'Livraison/Onboarding',
    'upsell': 'Fidélisation/Upsell'
  }[stage] || stage;

  return <StageBadge stage={stage} dealType={dealType}>{stageDisplayText}</StageBadge>;
};

export default DealStageBadge;
