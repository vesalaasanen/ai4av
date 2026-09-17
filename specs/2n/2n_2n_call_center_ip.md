---
spec_id: admin/2n-2n-call-center
schema_version: ai4av-public-spec-v1
revision: 1
title: "2N 2N® Call Center Control Spec"
manufacturer: 2N
model_family: "2N® Call Center v.2.8.5"
aliases: []
compatible_with:
  manufacturers:
    - 2N
  models:
    - "2N® Call Center v.2.8.5"
  firmware: 2.8.5
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - wiki.2n.com
source_urls:
  - https://wiki.2n.com/download/attachments/92439653/2N_LIFT8_Call_Center_EN_2.8.5.pdf
retrieved_at: 2026-09-16T13:05:57.827Z
last_checked_at: 2026-09-16T22:16:18.758Z
generated_at: 2026-09-16T22:16:18.758Z
firmware_coverage: 2.8.5
protocol_coverage: []
known_gaps:
  - "wire format of the proprietary TCP/UDP 7008 protocol is not documented in the source — only its existence, default port, and client login procedure. No payload bytes/strings for the proprietary protocol are given, so machine control of Communicator/Control Panel clients cannot be implemented from this source alone."
  - "credential exchange format for the proprietary protocol not specified in source"
  - "GUI button (\"Connect\") - no payload documented in source"
  - "GUI button (\"Disconnect\") - no payload documented in source"
  - "GUI button (\"Start watching\") - no payload documented in source"
  - "GUI button (\"End watching\") - no payload documented in source"
  - "GUI checkbox (\"Active\") - no payload documented in source"
  - "machine-writable variable interface for GUI-configured parameters not stated in source"
  - "proprietary TCP/UDP 7008 protocol message format (payloads, framing, checksums) not stated in source"
  - "authentication credential exchange format for the proprietary protocol not stated beyond default user existence"
  - "CPC and P100 protocol byte/command formats not stated in source (behaviour only)"
  - "power/voltage/current specifications not stated in source (software product)"
  - "GUI operations (Connect/Disconnect, Start/End watching, SIP line configuration, user management) have no documented machine-control payloads"
verification:
  verdict: verified
  checked_at: 2026-09-16T22:16:18.758Z
  matched_actions: 26
  action_count: 26
  confidence: medium
  summary: "All 26 spec actions map to documented l8-config CLI commands or GUI controls in the source; transport 7008/TCP-UDP confirmed; no fabricated commands. (13 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-09-16
---

# 2N 2N® Call Center Control Spec

## Summary
2N® Call Center v.2.8.5 is a server application suite (Server / Communicator / Control Panel) for 2N® Lift8 lift-intercom systems, integrating a SIP station with up to 8 accounts and 32 parallel calls. Server–application communication uses a proprietary protocol on TCP/UDP port 7008; server administration (start/stop, parameter get/set, database export/import) is performed via the `l8-config.exe` command-line tool. This spec covers the TCP/UDP transport, the l8-config CLI command set, CPC/P100 call-confirmation protocol behaviour, and device-state monitoring via the data tunnel.

<!-- UNRESOLVED: wire format of the proprietary TCP/UDP 7008 protocol is not documented in the source — only its existence, default port, and client login procedure. No payload bytes/strings for the proprietary protocol are given, so machine control of Communicator/Control Panel clients cannot be implemented from this source alone. -->

## Transport
```yaml
protocols:
  - tcp
  - udp
addressing:
  port: 7008  # default listening port of the server; set during installation and changeable
auth:
  type: credentials  # default administrator user (Name: Admin) is created during server installation
  # UNRESOLVED: credential exchange format for the proprietary protocol not specified in source
```

## Traits
```yaml
# - powerable     # inferred from -cStartServer / -cStopServer / -cRestartServer commands
# - queryable     # inferred from -l, -gListenPort, -gLicensesNumber, -gProductStatisticsEnable, --version
traits:
  - powerable
  - queryable
```

## Actions
```yaml
# All l8-config actions are invoked as: <l8-config path> <parameter>
# Common path: c:\Program Files\2N TELEKOMUNIKACE\2N Lift8\Server\l8-config.exe
# Parameters are set as program parameters: program name<space>program parameter.

# --- General commands ---
- id: list_all_parameters
  label: List All Parameters
  kind: query
  command: "l8-config.exe -l"
  params: []
  notes: writes out all the parameters.

- id: display_help
  label: Display Help
  kind: query
  command: "l8-config.exe --help"
  params: []
  notes: displays Help. Alias: -h.

- id: display_version
  label: Display Version
  kind: query
  command: "l8-config.exe --version"
  params: []
  notes: writes out the program version. Alias: -V.

- id: set_data_directory
  label: Set Server Data Directory
  kind: action
  command: "l8-config.exe -d <data directory>"
  params:
    - name: data_directory
      type: string
      description: Server data directory path.

# --- Parameter get commands ---
- id: get_listen_port
  label: Get Server Listening Port
  kind: query
  command: "l8-config.exe -gListenPort"
  params: []
  notes: writes out the server listening port.

- id: get_licenses_number
  label: Get Number of Installed Licences
  kind: query
  command: "l8-config.exe -gLicensesNumber"
  params: []
  notes: gets the number of installed licences.

- id: get_product_statistics_enable
  label: Get Product Statistics Sending Option
  kind: query
  command: "l8-config.exe -gProductStatisticsEnable"
  params: []
  notes: displays the server statistics sending option - 1 = enabled, 0 = disabled.

# --- Parameter set commands ---
- id: set_listen_port
  label: Set Server Listening Port
  kind: action
  command: "l8-config.exe -sListenPort <listen_port>"
  params:
    - name: listen_port
      type: integer
      description: Server listening port.

- id: set_product_statistics_enable
  label: Set Product Statistics Sending
  kind: action
  command: "l8-config.exe -sProductStatisticsEnable <value>"
  params:
    - name: value
      type: enum
      description: "1 = enabled, 0 = disabled."

- id: set_log_level
  label: Set Server Logging Level
  kind: action
  command: "l8-config.exe -sLogLevel <log_level>"
  params:
    - name: log_level
      type: integer
      description: Server logging level (1-5).

- id: set_max_user
  label: Set Maximum User TCP Connections
  kind: action
  command: "l8-config.exe -sMaxUser <max_user_tcp_conn>"
  params:
    - name: max_user_tcp_conn
      type: integer
      description: Maximum count of users connected to the server at the same time. Maximum count is based on the licence.

- id: set_max_lift
  label: Set Maximum Lift TCP Connections
  kind: action
  command: "l8-config.exe -sMaxLift <max_lift_tcp_conn>"
  params:
    - name: max_lift_tcp_conn
      type: integer
      description: Maximum count of lifts connected to the server at the same time. Maximum count is based on the licence.

- id: reset_admin_password
  label: Reset Admin Password
  kind: action
  command: "l8-config.exe -sResetAdmin"
  params: []
  notes: resets the Admin password to default '2n'.

# --- Server commands ---
- id: start_server
  label: Start Server
  kind: action
  command: "l8-config.exe -cStartServer"
  params: []
  notes: starts the l8 server.

- id: stop_server
  label: Stop Server
  kind: action
  command: "l8-config.exe -cStopServer"
  params: []
  notes: stops the l8 server.

- id: restart_server
  label: Restart Server
  kind: action
  command: "l8-config.exe -cRestartServer"
  params: []
  notes: restarts the l8 server.

- id: export_database
  label: Export Database
  kind: action
  command: "l8-config.exe -cExportDatabase"
  params: []
  notes: >-
    Exports the database to an XML file. Can run under normal operational conditions;
    a copy of the current database is made for the export. Creates a file named like
    db-20120221095921-export.xml (timestamp in YYYYMMDDhhmmss format).

- id: import_database
  label: Import Database
  kind: action
  command: "l8-config.exe -cImportDatabase <XML_file>"
  params:
    - name: xml_file
      type: string
      description: Path to exported database XML file - must always be given in inverted commas.
  notes: >-
    Imports the database from an XML file. Server MUST be stopped first or the attempt
    is identified as an error. Every successful table import is confirmed. Restart the
    server after every successful database import.

# --- Installer command line (server setup, run against the installer, not l8-config.exe) ---
- id: installer_verysilent
  label: Installer Very Silent Mode
  kind: action
  command: "/VERYSILENT"
  params: []
  notes: installation runs in the background, no installer is available to the user.

- id: installer_set_dir
  label: Installer Set Installation Location
  kind: action
  command: "/DIR=\"C:\\...\""
  params:
    - name: directory
      type: string
      description: Installation location path.

- id: installer_set_log
  label: Installer Create Log
  kind: action
  command: "/LOG=file_name.txt"
  params:
    - name: file_name
      type: string
      description: Installation course log file name (displayed in the installer directory).

# --- Data tunnel / surveillance (Control Panel GUI operations; no wire payload documented) ---
- id: tunnel_connect
  label: Data Tunnel Connect
  kind: action
  command: null  # UNRESOLVED: GUI button ("Connect") - no payload documented in source
  params: []
  notes: sets up an active connection via the data tunnel to view the current intercom device state (as in 2N® Lift8 ServiceTool). Requires intercom Serial number and Password (default 2n).

- id: tunnel_disconnect
  label: Data Tunnel Disconnect
  kind: action
  command: null  # UNRESOLVED: GUI button ("Disconnect") - no payload documented in source
  params: []
  notes: quits the device state monitoring mode.

- id: start_surveillance
  label: Start Surveillance
  kind: action
  command: null  # UNRESOLVED: GUI button ("Start watching") - no payload documented in source
  params: []
  notes: switching on/activation and online status reading of data tunnels to the intercoms.

- id: end_surveillance
  label: End Surveillance
  kind: action
  command: null  # UNRESOLVED: GUI button ("End watching") - no payload documented in source
  params: []
  notes: deactivation and ending of status reading of data tunnels to the intercoms.

# --- SIP line actions (Call Server GUI; no wire payload documented) ---
- id: sip_line_activate
  label: Activate/Deactivate SIP Line
  kind: action
  command: null  # UNRESOLVED: GUI checkbox ("Active") - no payload documented in source
  params:
    - name: line
      type: integer
      description: Line number (up to 8 independent telephone lines).
  notes: select/unselect Active to activate/deactivate the selected line. Registration packet is sent immediately on Save.
```

## Feedbacks
```yaml
- id: server_info_dump
  type: string
  description: >-
    Launching l8-config.exe without any parameter writes out all available information
    on the server.

- id: listen_port
  type: integer
  description: Server listening port (from -gListenPort). Default 7008.

- id: licenses_number
  type: integer
  description: Number of installed licences (from -gLicensesNumber).

- id: product_statistics_enable
  type: enum
  values: ["1", "0"]
  description: Server statistics sending option (from -gProductStatisticsEnable) - 1 = enabled, 0 = disabled.

- id: program_version
  type: string
  description: Program version (from --version).

- id: call_server_state
  type: enum
  values: [starting, running, waiting_for_reconfiguration, error]
  description: >-
    Current SIP call server state. If in a state other than Running, the Call Server
    rejects all incoming calls.

- id: maximum_simultaneous_calls
  type: integer
  description: >-
    Maximum count of checking calls the server can process at the same time; excess
    calls are rejected.

- id: sip_line_active
  type: boolean
  description: Whether a configured SIP line is currently on/off.

- id: sip_line_active_calls
  type: integer
  description: Current calls via the line; zero means no active incoming/outgoing call.

- id: sip_registration_result
  type: string
  description: >-
    SIP Proxy registration result, updated automatically. Success displays
    "Registered, Code: 200, OK"; on failure the SIP error code is shown. Unsuccessful
    registration packets are resent.

- id: intercom_error_state
  type: enum
  values: [battery_failure, stuck_button, audio_error, rescue_end]
  description: >-
    Device states monitored via operational calls, transmitted to the server via
    operational calls and the CPC and P100 protocols. Battery failure: battery capacity
    below a defined limit or batteries older than 2 years. Stuck button: Alarm button
    jammed due to mechanical defect or sabotage. Audio error: audio unit audio test
    fails. Rescue end: enabled automatically whenever an alarm call comes in. States
    can be ended using the application button or automatically by an operational call.

- id: surveillance_intercom_state
  type: enum
  values: [red, blue, green]
  description: >-
    Surveillance view state for 2N® Lift8 / LiftIP intercoms with data tunnel
    communication. Red = not connected to the server or shows a problem (described in
    the hint under the cursor); blue = server connection ready; green = OK.

- id: missed_call_indicator
  type: enum
  values: [missed, received]
  description: >-
    In DB_COMMUNICATOR mode, every missed call is marked with a red phone symbol
    (missed call message in Calls / Alarm menu); a call received by a third party shows
    a green phone and a call receiving message.
```

## Variables
```yaml
# Settable server parameters are exposed as discrete l8-config CLI actions (see Actions:
# -sListenPort, -sProductStatisticsEnable, -sLogLevel, -sMaxUser, -sMaxLift, -d).
# GUI-only settables (SIP line configuration, outgoing checking call parameters) have
# no documented machine interface.
# UNRESOLVED: machine-writable variable interface for GUI-configured parameters not stated in source
```

## Events
```yaml
- id: operational_call_state_transfer
  description: >-
    Operational call initiated by an action in the Central Unit; calls the server and
    transfers device state information via the CPC/P100 protocol. The action transits
    into an error state and then, if everything is OK, to the OK state.

- id: instantaneous_checking_call_notification
  description: >-
    Email notification sent the moment the set checking call timeout expires. Sending
    time limit for instantaneous alarm/checking call notifications is 5 minutes.

- id: instantaneous_alarm_call_notification
  description: >-
    Email notification sent the moment the alarm call to the communicator is ended.

- id: database_table_import_confirmed
  description: During database import, every successful table import is confirmed.
```

## Macros
```yaml
- id: database_import_sequence
  label: Database Import Sequence
  steps:
    - "l8-config.exe -cStopServer"
    - "l8-config.exe -cImportDatabase \"<path-to-export.xml>\""
    - "l8-config.exe -cStartServer"
  notes: >-
    Import may only be executed when the server is stopped; restart the server after
    every successful import. The XML file path must always be given in inverted commas.

- id: database_export
  label: Database Export
  steps:
    - "l8-config.exe -cExportDatabase"
  notes: >-
    Can run under normal operational conditions; a copy of the current database is made
    to avoid overwriting/modification during export. Output file named
    db-<YYYYMMDDhhmmss>-export.xml.
```

## Safety
```yaml
confirmation_required_for:
  - import_database  # if no path is found, the current database will be deleted and replaced with a new, empty one
interlocks:
  - database import may only be executed when the server is stopped; a running server identifies any importing attempt as an error
  - server must be restarted after every successful database import
  - if the Call Server is in a state other than Running, it rejects all incoming calls
# Source cautions (non-interlock): do not keep SIP communication logging (Trace/pjsip.log)
# enabled for too long - log files can reach hundreds of MB due to high frequency of
# incoming calls; use for error diagnostics only. Email server supports insecure
# connection on port 25 only (no SSL); function does not work with two-factor
# authenticated e-mail accounts.
```

## Notes
- Server–application communication uses a proprietary protocol on TCP/UDP port 7008; the port is set by default during installation and can be changed (via `-sListenPort`). The wire format of this proprietary protocol is not documented in the source.
- A default user with administrator login is created during server installation (Name: Admin, Port: 7008); `-sResetAdmin` resets the Admin password to the default '2n'. Communicator/Control Panel clients log in with server IP/DNS address plus the listening port; firewall/NAT must pass traffic on this port.
- SIP line defaults: SIP Proxy port 5060 (add non-default port behind a colon in the Domain/Server field); Registration expires default 300 s; Timeout – DTMF default 120 s (call terminated if no DTMF arrives after answer); Transport SIP uses UDP; Local SIP port is generated automatically by default. SIP stack changes are not applied until the server is restarted manually (Services menu or l8-config.exe).
- Third-party equipment can use standard CPC and P100 protocols instead of the proprietary protocol (device type set to Unknown). Calls from numbers not in the database are always served by sending DTMF 5 and hang-up. Intercom identification must be set manually for CPC/P100 counterparty authorisation; it is not checked when confirming with a DTMF character.
- Alarm call response modes: Normal call, Confirm with 1, CPC Antenna, CPC KONE, P100. Checking call response modes: Reject, Accept and send 5, Confirm with 1 and 5, CPC Antenna, CPC Antenna 2N Ext, CPC KONE, P100 (group-level list omits CPC Antenna 2N Ext).
- Device types: 2N® LiftNet, 2N® SingleTalk, 2N® Lift8, 2N® Lift1, 2N® LiftIP, Unknown.
- Data tunnel requires the intercom Serial number and Password (default password 2n); data is transmitted continuously while the tunnel connection is active.
- Outgoing checking call parameters: Unsuccessful call repeat count, Repeat call interval, Call duration (max timeout before automatic hang-up), Unsuccessful call message (supports `%TEL_NUM` string for the inaccessible intercom number), Message recipient number, Maximum count of simultaneous outgoing calls (respect outgoing gateway capacity).
- SMTP reports: insecure connection, port 25; report body strings `%DATE`, `%INTERCOMS`, `%CHECKINGCALLS`, `%ALARMCALLS`, `%OUTGCALLS`.
- Installer: `/VERYSILENT`, `/DIR="C:\..."`, `/LOG=file_name.txt`.

<!-- UNRESOLVED: proprietary TCP/UDP 7008 protocol message format (payloads, framing, checksums) not stated in source -->
<!-- UNRESOLVED: authentication credential exchange format for the proprietary protocol not stated beyond default user existence -->
<!-- UNRESOLVED: CPC and P100 protocol byte/command formats not stated in source (behaviour only) -->
<!-- UNRESOLVED: power/voltage/current specifications not stated in source (software product) -->
<!-- UNRESOLVED: GUI operations (Connect/Disconnect, Start/End watching, SIP line configuration, user management) have no documented machine-control payloads -->

## Provenance

```yaml
source_domains:
  - wiki.2n.com
source_urls:
  - https://wiki.2n.com/download/attachments/92439653/2N_LIFT8_Call_Center_EN_2.8.5.pdf
retrieved_at: 2026-09-16T13:05:57.827Z
last_checked_at: 2026-09-16T22:16:18.758Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-09-16T22:16:18.758Z
matched_actions: 26
action_count: 26
confidence: medium
summary: "All 26 spec actions map to documented l8-config CLI commands or GUI controls in the source; transport 7008/TCP-UDP confirmed; no fabricated commands. (13 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "wire format of the proprietary TCP/UDP 7008 protocol is not documented in the source — only its existence, default port, and client login procedure. No payload bytes/strings for the proprietary protocol are given, so machine control of Communicator/Control Panel clients cannot be implemented from this source alone."
- "credential exchange format for the proprietary protocol not specified in source"
- "GUI button (\"Connect\") - no payload documented in source"
- "GUI button (\"Disconnect\") - no payload documented in source"
- "GUI button (\"Start watching\") - no payload documented in source"
- "GUI button (\"End watching\") - no payload documented in source"
- "GUI checkbox (\"Active\") - no payload documented in source"
- "machine-writable variable interface for GUI-configured parameters not stated in source"
- "proprietary TCP/UDP 7008 protocol message format (payloads, framing, checksums) not stated in source"
- "authentication credential exchange format for the proprietary protocol not stated beyond default user existence"
- "CPC and P100 protocol byte/command formats not stated in source (behaviour only)"
- "power/voltage/current specifications not stated in source (software product)"
- "GUI operations (Connect/Disconnect, Start/End watching, SIP line configuration, user management) have no documented machine-control payloads"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
