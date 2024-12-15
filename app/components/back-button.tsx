import Link from 'next/link';
import React from 'react';
import { useLanguage } from '../context/LanguageContext';

interface BackButtonProps {
  position?: string;
}

const BackButton: React.FC<BackButtonProps> = ({ position }) => {
  const { t } = useLanguage();
  return (
    <Link href="../../">
      <div
        className={`bg-blue-500 px-4 py-2 rounded-lg shadow-md hover:bg-blue-600 transition duration-200 transform hover:scale-105 ${position}`}
      >
        {t('back')}
      </div>
    </Link>
  );
};

export default BackButton;
