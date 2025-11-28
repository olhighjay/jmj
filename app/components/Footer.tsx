"use client";

export const Footer = () => (
    <footer className="text-center py-8 border-t border-gray-200 mt-16">
        <p className="text-gray-600 mb-2">
            <a
                href="mailto:oluwasemowolegacy@gmail.com"
                className="text-red-700 hover:text-red-900"
            >
                oluwasemowolegacy@gmail.com
            </a>
        </p>
        <p className="text-sm text-gray-500">
            COPYRIGHT ©{new Date().getFullYear()}
        </p>
    </footer>
)