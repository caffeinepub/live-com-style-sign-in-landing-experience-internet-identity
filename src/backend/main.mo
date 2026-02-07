import Map "mo:core/Map";
import Time "mo:core/Time";
import Runtime "mo:core/Runtime";
import Principal "mo:core/Principal";

actor {
  type UserRecord = {
    var createdAt : Time.Time;
    var lastLogin : Time.Time;
  };

  let users = Map.empty<Principal, UserRecord>();

  public shared ({ caller }) func registerOrGetUser() : async Time.Time {
    let currentTime = Time.now();

    switch (users.get(caller)) {
      case null {
        let newUser : UserRecord = {
          var createdAt = currentTime;
          var lastLogin = currentTime;
        };
        users.add(caller, newUser);
        currentTime;
      };
      case (?user) {
        user.lastLogin := currentTime;
        user.createdAt;
      };
    };
  };

  public query ({ caller }) func getUserRecord() : async (Time.Time, Time.Time) {
    switch (users.get(caller)) {
      case (null) { Runtime.trap("User not found") };
      case (?user) { (user.createdAt, user.lastLogin) };
    };
  };

  public query ({ caller }) func isRegistered() : async Bool {
    users.containsKey(caller);
  };
};
