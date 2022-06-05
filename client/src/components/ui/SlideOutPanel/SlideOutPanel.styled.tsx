import styled from "styled-components";

export const TogglePanel = styled.div`
	display: flex;
	position: fixed;
	width: 550px;
	height: 100vh;
	top: 0;
	right: -500px;
	text-align: center;

	.open {
		background-color: ${({ theme }) => theme.colors.card.primary};
		transform: translateX(-550px);
	}
`;

export const GameRulesTitle = styled.div`
	font-size: ${({ theme }) => theme.size.desktop.mdl}px;
	height: 100%;
	width: 50px;
	text-align: center;
	writing-mode: vertical-lr;
	padding-left: 5px;
	background-color: ${({ theme }) => theme.colors.card.linecolor};
	cursor: pointer;
`;

export const Rules = styled.div`
	font-family: "Montaga", serif;
  line-height: 1.5;
	padding: 1rem;
	font-size: ${({ theme }) => theme.size.desktop.mds}px;
	overflow: auto;
  scrollbar-color: #3B1616 #5C2121;
`;
