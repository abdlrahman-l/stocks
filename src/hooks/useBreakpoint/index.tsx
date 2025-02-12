import { useEffect, useRef, useState } from 'react';

export const breakpointToMediaQuery = {
	xl: '(min-width: 1200px)',
	lg: '(min-width: 992px)',
	md: '(min-width: 768px)',
	sm: '(min-width: 576px)',
	xs: '(max-width: 575px)',
};

const initialState = {
	xs: false,
	sm: false,
	md: false,
	lg: false,
	xl: false,
};

export default function useBreakpoint() {
	const [matches, setMatch] = useState(initialState);

	const isMatchMediaSupported =
		typeof window !== 'undefined' && typeof window.matchMedia !== 'undefined';

	const active = useRef(false);

	useEffect(() => {
		const effect = isMatchMediaSupported
			? () => {
					const breakpointEntries = Object.entries(breakpointToMediaQuery);
					const mediaQueryLists = breakpointEntries.map(([, query]) => window.matchMedia(query));

					const updateMatch = () =>
						active.current &&
						setMatch(
							breakpointEntries.reduce(
								(acc, [key], i) => ({
									...acc,
									[key]: mediaQueryLists[i].matches,
								}),
								initialState,
							),
						);

					return {
						activate: () => {
							active.current = true;

							updateMatch();
							mediaQueryLists.forEach((q) => {
								q.addListener(updateMatch);
							});
						},
						deactivate: () => {
							active.current = false;
							mediaQueryLists.forEach((q) => {
								q.removeListener(updateMatch);
							});
						},
					};
				}
			: null;

		effect?.()?.activate();

		return effect?.()?.deactivate;
	}, [isMatchMediaSupported]);

	return matches;
}
