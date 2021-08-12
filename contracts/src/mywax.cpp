#include <mywax.hpp>

ACTION mywax::hi( name nm ) {
   /* fill in action body */
   print_f("Name : %\n",nm);
}

ACTION mywax::getbalance(name owner, name author, string sym)
{
   
	const auto& inventory_index = sinventory_.template get_index<"owner"_n>();

	for (auto itr_inventory = inventory_index.find(owner.value); itr_inventory != inventory_index.end(); itr_inventory++)
	{
		if (owner.value != itr_inventory->owner.value) {
			break;
		}

		if (itr_inventory->author == author && itr_inventory->quantity.symbol.code().to_string() == sym) {
			print("\n balance:" , itr_inventory->quantity, ":");
		}
	}
 
}

ACTION mywax::acceptprop(name owner, uint64_t proposal_id, uint64_t box_id)
{
	require_auth(owner);
	find_match_for_owner(owner, proposal_id, box_id);

	// do exchange after the end of matching
	//exchange_aftermatch(owner, proposal_id);
}
ACTION mywax::cancelprop(name owner, uint64_t proposal_id)
{
	require_auth(owner);

	const auto& itr = stproposals_.require_find(proposal_id, string("Proposal id: " + to_string(proposal_id) + " does not exist").c_str());

	check(!(itr->owner != owner), "Wrong owner for proposal id: " + to_string(proposal_id) + ". You entered owner: " + owner.to_string() + " but proposal belong to: " + itr->owner.to_string());

	const auto& owner_index = sinventory_.template get_index<"owner"_n>();

	for (auto itrowner = owner_index.find(owner.value); itrowner != owner_index.end(); itrowner++)
	{
			if (owner.value != itrowner->owner.value) {
				break;
			}

		    auto inproposal =  itrowner->inproposal;
			auto inprop_itr = find( inproposal.begin(), inproposal.end(), proposal_id );

			if (inprop_itr != inproposal.end())
			{
				const auto& itr = sinventory_.find(itrowner->id);
				if (itr != sinventory_.end()) {
					inproposal.erase(inprop_itr);
					sinventory_.modify(itr, owner, [&](auto& s) {
						s.inproposal = inproposal;
					});
				}
			}
	}

	stproposals_.erase(itr);

}
ACTION mywax::cancelwish(name owner, uint64_t wish_id)
{
	require_auth(owner);

	auto itr_wish =1;
}

ACTION mywax::getversion() {

	string symbol;
	#ifdef EOS_CHAIN
	symbol = "EOS ";
	#endif

	#ifdef WAX_CHAIN
	symbol = "WAX";
	#endif

	string versio_info = "Version number 1.0.0, Symbol: " + symbol + string(". Build date: 2021-04-06 12:46 ");

#ifdef DEBUG
	versio_info += "Debug " + versio_info;
#endif // DEBUG

	check(false, versio_info);
}

void mywax::depositFT(name deposit_account, name author, asset quantity, uint64_t assettype)
{
	const auto& myinventory_index = sinventory_.template get_index<"owner"_n>();

	auto newasset = true;
	for (auto itrmynventory = myinventory_index.find(deposit_account.value); itrmynventory != myinventory_index.end(); itrmynventory++)
	{
		if (deposit_account.value != itrmynventory->owner.value) {
			break;
		}

		if (itrmynventory->author == author && itrmynventory->quantity.symbol.code() == quantity.symbol.code())
		{
			const auto& itr = sinventory_.find(itrmynventory->id);
			if (itr != sinventory_.end())
			{
				if (hasLogging) { print("\n Deposit itr->quantity:  ", itr->quantity); }

				sinventory_.modify(itr, get_self(), [&](auto& s) {
					s.quantity.amount += quantity.amount;
				});

				if (hasLogging) { print("\n itr->quantity: ", itr->quantity); }

				newasset = false;
				break;
			}
		}
	}

	if (newasset)
	{
		const auto id = sinventory_.available_primary_key();
		sinventory_.emplace(get_self(), [&](auto& g) {
			g.id        = id;
			g.owner     = deposit_account;
			g.assettype = assettype;
			g.author    = author;
			g.quantity  = quantity;
		});
	}
}
void mywax::receiveASSETF(name from, name to, name author, asset quantity, string memo)
{
	if (from == get_self()) {
		return;
	}
	require_auth(from);

	depositFT(from, author, quantity, SA_FT);
}

void mywax::receiveASSET(name from, name to, vector<uint64_t>& assetids, string memo) {

	if (from == get_self()) {
		return;
	}
	
	require_auth(from);
	require_recipient(from);
}

void mywax::receiveToken(name from, name to, asset quantity, string memo)
{
	if (to != get_self()) {
		return;
	}

	require_auth(from);

}


void mywax::find_match_for_owner(const name& owner, const uint64_t& proposal_id, const uint64_t& box_id)
{
	auto itr_proposal_to_accept = stproposals_.require_find(proposal_id, string("Wrong proposal id: " + to_string(proposal_id)).c_str());
	
	auto proposalid_index = sconditions_.template get_index<"proposalid"_n>();
	auto is_box_exist = false;

	for (auto itr_one_object_conditions = proposalid_index.find(proposal_id); itr_one_object_conditions != proposalid_index.end(); itr_one_object_conditions++)
	{
		if (proposal_id != itr_one_object_conditions->proposalid) {
			break;
		}

		if (itr_one_object_conditions->boxid == box_id)
		{
			is_box_exist = true; // box_id from parameter exist in proposal

		
			check(false, "Condition does not have assettype");

		}
	}

	check(!(is_box_exist == false), "Parameter box_id: " + to_string(box_id) + " does not exist for proposal id: " + to_string(proposal_id));

}