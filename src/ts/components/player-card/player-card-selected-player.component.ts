import Component from "@/lib/component";
import { Player, PlayerStatisticName } from "@/models/player-card.models";

/**
 * A card that contains information about a player
 */
export default class PlayerCardSelectedPlayerComponent extends Component {
	render(props: { player: Player }) {
		this.destroy(); //lot of effort to avoid having to do this

		const getStat = (statName: PlayerStatisticName) => props.player.stats.find(stat => stat.name === statName)?.value ?? null;

		//read / calculate stats
		const goals = getStat("goals");
		const appearances = getStat("appearances");
		const assists = getStat("goal_assist");
		const goalsPerMatch = goals === null || appearances === null ? null : (goals / appearances).toFixed(2);
		const fwdPasses = getStat("fwd_pass");
		const backwardPasses = getStat("backward_pass");
		const minsPlayed = getStat("mins_played");
		const passesPerMinute = fwdPasses === null || backwardPasses === null || minsPlayed === null ? null : ((fwdPasses + backwardPasses) / minsPlayed).toFixed(2);

		const renderStat = (label: string, stat: string | number | null) => stat !== null ? `<li>${label} <span>${stat}</span></li>` : null;

		const className = "player-card--selected-player";
		this.setHtml(`
			<div class="${className}">
				<div class="${className}--image">
					<img src="/static/img/p${props.player.player.id}.png" draggable="false">
				</div>
				<div class="${className}--details">
					<div class="${className}--info">
						<div class="${className}--info--basic">
							<h1 class="${className}--name">${props.player.player.name.first} ${props.player.player.name.last}</h1>
							<h2 class="${className}--position">${props.player.player.info.positionInfo}</h2>
						</div>

						<div class="${className}--info--team-icon">
							<i data-team="${props.player.player.currentTeam.shortName.toLowerCase().replace(" ", "-")}"></i>
						</div>						
					</div>
					<ul class="${className}--stats">
						${renderStat("Appearances", appearances) ?? ""}
						${renderStat("Goals", goals) ?? ""}
						${renderStat("Assists", assists) ?? ""}
						${renderStat("Goals per match", goalsPerMatch) ?? ""}
						${renderStat("Passes per minute", passesPerMinute) ?? ""}
					</ul>
				</div>
			</div>
		`);

		this.markAsRendered();
	}
}