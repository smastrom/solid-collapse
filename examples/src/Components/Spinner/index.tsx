import styles from './styles.module.css';

export const Spinner = ({ style }: { style: string }) => (
	<span style={style} class={styles.spinner} />
);
