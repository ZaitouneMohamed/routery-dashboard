import React, { useState } from 'react';
import { Link, router } from '@inertiajs/react';
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react';

interface PaginationProps {
    links: {
        first: string | null;
        last: string | null;
        prev: string | null;
        next: string | null;
    };
    from: number;
    to: number;
    total: number;
    currentPage: number;
}

const Pagination: React.FC<PaginationProps> = ({ links, from, to, total, currentPage }) => {
    const [showJumpInput, setShowJumpInput] = useState<boolean>(false);
    const [jumpToPage, setJumpToPage] = useState<string>('');
    const pageSize = to - from + 1;
    const totalPages = Math.ceil(total / pageSize) || 1;

    // Helper function to preserve existing query parameters
    const createPageUrl = (page: number): string => {
        const url = new URL(window.location.href);
        url.searchParams.set('page', page.toString());
        return url.pathname + url.search;
    };

    const handleJumpToPage = (e: React.FormEvent) => {
        e.preventDefault();
        const page = parseInt(jumpToPage);
        if (page && page > 0 && page <= totalPages) {
            router.get(createPageUrl(page), {}, {
                preserveScroll: true,
                preserveState: true,
                replace: true
            });
            setJumpToPage('');
            setShowJumpInput(false);
        }
    };

    const handleEllipsisClick = () => {
        setShowJumpInput(true);
    };

    const renderPageNumbers = () => {
        const pageNumbers: JSX.Element[] = [];
        let startPage = 1;
        let endPage = totalPages;
        let showStartEllipsis = false;
        let showEndEllipsis = false;

        if (totalPages > 7) {
            if (currentPage <= 4) {
                endPage = 5;
                showEndEllipsis = true;
            } else if (currentPage >= totalPages - 3) {
                startPage = totalPages - 4;
                showStartEllipsis = true;
            } else {
                startPage = currentPage - 2;
                endPage = currentPage + 2;
                showStartEllipsis = true;
                showEndEllipsis = true;
            }
        }

        // Add first page if showing start ellipsis
        if (showStartEllipsis) {
            pageNumbers.push(
                <Link
                    key={1}
                    href={links.first || createPageUrl(1)}
                    preserveScroll
                    className="relative inline-flex items-center px-4 py-2 text-sm font-medium border border-gray-300 text-gray-700 bg-white hover:bg-gray-50 transition-colors duration-150"
                >
                    1
                </Link>
            );

            // Add start ellipsis with jump input
            pageNumbers.push(
                <button
                    key="start-ellipsis"
                    onClick={handleEllipsisClick}
                    className="relative inline-flex items-center px-4 py-2 text-sm text-gray-500 hover:text-blue-600 focus:outline-none transition-colors duration-150"
                >
                    ...
                </button>
            );
        }

        // Add main page numbers
        for (let i = startPage; i <= endPage; i++) {
            if (showStartEllipsis && i === 1) continue;
            if (showEndEllipsis && i === totalPages) continue;

            pageNumbers.push(
                <Link
                    key={i}
                    href={createPageUrl(i)}
                    preserveScroll
                    className={`
                        relative inline-flex items-center px-4 py-2 text-sm font-medium
                        border border-gray-300 -ml-px first:ml-0
                        focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500
                        transition-colors duration-150 ease-in-out
                        ${currentPage === i
                            ? 'z-10 bg-blue-600 text-white hover:bg-blue-700 border-blue-600'
                            : 'text-gray-700 bg-white hover:bg-gray-50'
                        }
                    `}
                >
                    {i}
                </Link>
            );
        }

        // Add end ellipsis with jump input
        if (showEndEllipsis) {
            pageNumbers.push(
                <button
                    key="end-ellipsis"
                    onClick={handleEllipsisClick}
                    className="relative inline-flex items-center px-4 py-2 text-sm text-gray-500 hover:text-blue-600 focus:outline-none transition-colors duration-150"
                >
                    ...
                </button>
            );

            // Add last page
            pageNumbers.push(
                <Link
                    key={totalPages}
                    href={links.last || createPageUrl(totalPages)}
                    preserveScroll
                    className="relative inline-flex items-center px-4 py-2 text-sm font-medium border border-gray-300 text-gray-700 bg-white hover:bg-gray-50 transition-colors duration-150"
                >
                    {totalPages}
                </Link>
            );
        }

        return pageNumbers;
    };

    interface NavigationButtonProps {
        url: string | null;
        icon: React.ElementType;
        label: string;
        isFirst?: boolean;
        isLast?: boolean;
    }

    const renderNavigationButton = ({ url, icon: Icon, label, isFirst = false, isLast = false }: NavigationButtonProps) => (
        <Link
            href={url || '#'}
            preserveScroll
            className={`
                relative inline-flex items-center px-3 py-2 text-sm font-medium
                border border-gray-300 bg-white -ml-px first:ml-0
                transition-colors duration-150 ease-in-out
                focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500
                ${!url
                    ? 'text-gray-300 cursor-not-allowed pointer-events-none'
                    : 'text-gray-700 hover:bg-gray-50'
                }
                ${isFirst ? 'rounded-l-md' : ''}
                ${isLast ? 'rounded-r-md' : ''}
            `}
            aria-label={label}
        >
            <Icon className="w-5 h-5" />
        </Link>
    );

    return (
        <div className="px-6 py-4 border-t border-gray-200 bg-white">
            <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
                {/* Results Counter */}
                <div className="text-sm text-gray-700">
                    <span className="font-medium">{from}</span>
                    {' '}-{' '}
                    <span className="font-medium">{to}</span>
                    {' '}of{' '}
                    <span className="font-medium">{total}</span>
                    {' '}results
                </div>

                {/* Navigation */}
                <div className="flex items-center">
                    <div className="flex items-center">
                        {/* First Page */}
                        {renderNavigationButton({
                            url: links.first && currentPage > 1 ? links.first : null,
                            icon: ChevronsLeft,
                            label: "First page",
                            isFirst: true
                        })}

                        {/* Previous Page */}
                        {renderNavigationButton({
                            url: links.prev,
                            icon: ChevronLeft,
                            label: "Previous page"
                        })}

                        {/* Page Numbers and Jump Input */}
                        <div className="hidden sm:flex items-center">
                            {showJumpInput ? (
                                <form onSubmit={handleJumpToPage} className="flex items-center mx-2">
                                    <input
                                        type="number"
                                        min="1"
                                        max={totalPages}
                                        value={jumpToPage}
                                        onChange={(e) => setJumpToPage(e.target.value)}
                                        className="w-16 px-2 py-1 text-sm border border-gray-300 rounded-md bg-white
                                                 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        placeholder={`1-${totalPages}`}
                                        autoFocus
                                        onBlur={() => {
                                            if (!jumpToPage) {
                                                setShowJumpInput(false);
                                            }
                                        }}
                                    />
                                </form>
                            ) : (
                                renderPageNumbers()
                            )}
                        </div>

                        {/* Next Page */}
                        {renderNavigationButton({
                            url: links.next,
                            icon: ChevronRight,
                            label: "Next page"
                        })}

                        {/* Last Page */}
                        {renderNavigationButton({
                            url: links.last && currentPage < totalPages ? links.last : null,
                            icon: ChevronsRight,
                            label: "Last page",
                            isLast: true
                        })}
                    </div>
                </div>
            </div>

            {/* Mobile Pagination */}
            <div className="sm:hidden mt-4">
                <div className="flex justify-center items-center space-x-2">
                    {showJumpInput ? (
                        <form onSubmit={handleJumpToPage} className="flex items-center">
                            <input
                                type="number"
                                min="1"
                                max={totalPages}
                                value={jumpToPage}
                                onChange={(e) => setJumpToPage(e.target.value)}
                                className="w-16 px-2 py-1 text-sm border border-gray-300 rounded-md bg-white
                                         focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                placeholder={`1-${totalPages}`}
                                autoFocus
                                onBlur={() => {
                                    if (!jumpToPage) {
                                        setShowJumpInput(false);
                                    }
                                }}
                            />
                        </form>
                    ) : (
                        renderPageNumbers()
                    )}
                </div>
            </div>
        </div>
    );
};

export default Pagination;
