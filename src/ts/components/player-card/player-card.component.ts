import Component from "@/lib/component";
import { Player, PlayerStatisticName } from "@/models/player-card.models";

/**
 * A card that contains information about a player
 */
export default class PlayerCard extends Component {
	create(props: {
		player: Player
	}) {
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

		this.setHtml(`
			<div class="player-card">
				<div class="player-card--image">
					<img src="/static/img/p${props.player.player.id}.png" draggable="false">
				</div>
				<div class="player-card--details">
					<div class="player-card--info">
						<div class="player-card--info--basic">
							<h1 class="player-card--name">${props.player.player.name.first} ${props.player.player.name.last}</h1>
							<h2 class="player-card--position">${props.player.player.info.positionInfo}</h2>
						</div>

						<div class="player-card--info--team-icon">
							<i data-team="${props.player.player.currentTeam.shortName.toLowerCase().replace(" ", "-")}"></i>
						</div>						
					</div>
					<ul class="player-card--stats">
						${renderStat("Appearances", appearances) ?? ""}
						${renderStat("Goals", goals) ?? ""}
						${renderStat("Assists", assists) ?? ""}
						${renderStat("Goals per match", goalsPerMatch) ?? ""}
						${renderStat("Passes per minute", passesPerMinute) ?? ""}
					</ul>
				</div>
			</div>
		`);
	}
}