

#include <eosio/eosio.hpp>
#include <eosio/asset.hpp>
#include <eosio/singleton.hpp>
#include <eosio/transaction.hpp>
#include <eosio/crypto.hpp>
#include <eosio/print.hpp>
#include <map>
#include <tuple>
#include <vector>
#include <string>
#include <json.hpp>

using json = nlohmann::json;

using namespace std;
using namespace eosio;

typedef uint64_t box_id_t;
typedef uint64_t object_id_t;
typedef uint64_t assettype_t;
typedef uint64_t nft_id_t;
typedef uint64_t inventory_id_t;
typedef string   key_t;
typedef string   operation_t;
typedef string   value_t;
typedef uint64_t amount_t;

bool hasLogging = true;
enum token_type {SA_NFT = 0, SA_FT = 1, TOKEN = 2};

CONTRACT mywax : public contract {

   public:

      TABLE inventory{
            uint64_t                id;         // unique id for every NFT or FT. (If two different owners have the same FT (like PGL), it get different ids.
            name                    owner;      // wax account
            uint64_t                aid;        // Asset ID
            uint64_t                assettype;  // SA NFT, SA FT, or a # for every unique non-SA tokens
            asset                   quantity;   // for SA FTs, or non-SA tokens
            vector<uint64_t>        inproposal; // array of all existing proposals which contain this asset (Needed for easy cancellation of offers if asset is traded elsewhere.)
            name                    author;     // SA author
            name                    category;   // SA category
            string                  idata;      // immutable data
            string                  mdata;      // mutable data

            auto primary_key() const {
               return id;
            }
            uint64_t by_author() const {
               return author.value;
            }
            uint64_t by_owner() const {
               return owner.value;
            }
            uint64_t by_aid() const {
               return aid;
            }
         };
         typedef eosio::multi_index< "sinventory"_n, inventory,
            eosio::indexed_by< "author"_n, eosio::const_mem_fun<inventory, uint64_t, &inventory::by_author> >,
            eosio::indexed_by< "owner"_n,  eosio::const_mem_fun<inventory, uint64_t, &inventory::by_owner> >,
            eosio::indexed_by< "aid"_n,    eosio::const_mem_fun<inventory, uint64_t, &inventory::by_aid> >
         > sinventory;

      TABLE conditions{
         uint64_t				id;
         name					owner;      // account making the proposal and condition
         uint64_t				proposalid; // unique id for proposal that connected this condition 
         uint64_t				boxid;      // id for every group of objects in proposal 
         uint64_t				objectid;   // id for every object in boix for proposal 
         //vector<tuple<key_t, operation_t, value_t> >     aconditions; // auto-accept conditions (see below). < key , operation(= != > <), value >
         auto primary_key() const {
            return id;
         }
         uint64_t by_proposal() const {
            return proposalid;
		}
	};
	typedef eosio::multi_index< "sconditions"_n, conditions,
		eosio::indexed_by< "proposalid"_n, eosio::const_mem_fun<conditions, uint64_t, &conditions::by_proposal> >
	> sconditions;

TABLE tproposals {
		uint64_t				id;          // unique id for every proposal
		uint64_t				aaid;        // if we are auto-matching on-chain then we  may need optimizied way to quick identify proposals with auto-accept conditions
		name					owner;       // account making the proposal
		name					toaccount;   // Wax account is offer is made exclusively to another user
		uint64_t				datestart;   // (optional) proposal activation DTG
		uint64_t				dateexpire;  // (optional) proposal expiration DTG
		uint64_t				topropid;    // An "offer" made to a specific existing proposals
		bool					auto_accept; // is proposal allow auto accept 
		string					memo;        // with a character limit of 256? 

		auto primary_key() const {
			return id;
		}

		uint64_t by_owner() const {
			return owner.value;
		}

		uint64_t by_topropid() const {
			return topropid;
		}
	};
	typedef eosio::multi_index< "stproposals"_n, tproposals,
		eosio::indexed_by< "owner"_n,    eosio::const_mem_fun<tproposals, uint64_t, &tproposals::by_owner> >,
		eosio::indexed_by< "topropid"_n, eosio::const_mem_fun<tproposals, uint64_t, &tproposals::by_topropid> >
	> stproposals;


	/*
		wish
		uint64_t: id *     // unique id for every wish item
		name: owner*       // account making the wish
		vector<tuple<key,op, val>> : conditions // auto-accept conditions (see below)
	*/

	TABLE wish {
		uint64_t				id;
		name					owner;
		//vector<tuple<key_t, operation_t, value_t> >     conditions; // auto-accept conditions (see below). < key , operation(= != > <), value >

		auto primary_key() const {
			return id;
		}
		uint64_t by_owner() const {
			return owner.value;
		}
	};
	typedef eosio::multi_index< "swish"_n, wish,
		eosio::indexed_by< "owner"_n, eosio::const_mem_fun<wish, uint64_t, &wish::by_owner> >
	> swish;

      using contract::contract;

      ACTION hi( name nm );
      using hi_action = action_wrapper<"hi"_n, &mywax::hi>;
      

      ACTION getbalance(name owner, name author, string sym);
      using getbalance_action = action_wrapper<"getbalance"_n, &mywax::getbalance>;
      
/*
      ACTION createprop(name owner, vector<nft_id_t>& nfts, vector<tuple<name, asset, assettype_t>>& fts, vector<tuple<box_id_t, object_id_t, key_t, operation_t, value_t>>& conditions, exchange_fees fees, uint64_t topropid, name account_to, uint64_t datestart, uint64_t dateexpire, bool auto_accept, string memo);
      using createprop_action = action_wrapper<"createprop"_n, &mywax::createprop>;
*/
      ACTION acceptprop(name owner, uint64_t proposal_id, uint64_t box_id);
      using acceptprop_action = action_wrapper<"acceptprop"_n, &mywax::acceptprop>;
   
      ACTION cancelprop(name owner, uint64_t proposal_id);
      using cancelprop_action = action_wrapper<"cancelprop"_n, &mywax::cancelprop>;

      ACTION getversion();
       using getversion_action = action_wrapper<"getversion"_n, &mywax::getversion>;

      ACTION cancelwish(name owner, uint64_t wish_id);
	   using cancelwish_action = action_wrapper<"cancelwish"_n, &mywax::cancelwish>;
	  /*
      ACTION createwish(name owner, vector<tuple<key_t, operation_t, value_t>>& conditions);
      using createwish_action = action_wrapper<"createwish"_n, &mywax::createwish>;

       ACTION withdraw(name owner, vector<nft_id_t>& nfts, vector<tuple<name, asset, assettype_t>>& fts);
	   using withdraw_action = action_wrapper<"withdraw"_n, &mywax::withdraw>;
*/

   void find_match_for_owner(const name& owner, const uint64_t& proposal_id, const uint64_t& box_id); 
	void depositFT(name deposit_account, name author, asset quantity, uint64_t assettype);
	void receiveToken(name from, name to, asset quantity, string memo);
	void receiveASSET (name from, name to, vector<uint64_t>& assetids, string memo);
	void receiveASSETF(name from, name to, name author, asset quantity, string memo);

   private:
      sinventory sinventory_   = { _self, _self.value };
      stproposals stproposals_ = { _self, _self.value };
      sconditions sconditions_ = { _self, _self.value };
};