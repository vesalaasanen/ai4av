---
spec_id: admin/gude-systems-smart-pdu
schema_version: ai4av-public-spec-v1
revision: 1
title: "Gude Systems Smart PDU Control Spec"
manufacturer: Gude
model_family: "Expert Power Control series (newer generation)"
aliases: []
compatible_with:
  manufacturers:
    - Gude
    - "Gude Systems"
  models:
    - "Expert Power Control series (newer generation)"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - wiki.gude-systems.com
source_urls:
  - https://wiki.gude-systems.com/EPC_HTTP_Interface
retrieved_at: 2026-07-13T23:09:24.781Z
last_checked_at: 2026-08-19T09:22:26.266Z
generated_at: 2026-08-19T09:22:26.266Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "device model variants / output counts (N) and firmware version not stated in this excerpt."
  - "default stated as 80 in cmd=18 example; configurable via cmd=18 port param"
  - "username/password values not stated in source."
  - "source describes an \"events\" JSON object (message-events counter,"
  - "source notes firmware/SSL/config uploads \"REQUIRES Reset_device after upload\""
  - "device-specific output count N, firmware version, default admin/user passwords, and unsolicited event/notification schema are not documented in this source excerpt."
verification:
  verdict: verified
  checked_at: 2026-08-19T09:22:26.266Z
  matched_actions: 47
  action_count: 47
  confidence: medium
  summary: "All 47 spec actions map to distinct cmd=N opcodes, upload endpoints, or statusjsn.js/cfgjsn.js component bits documented verbatim in the source. (6 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-08-16
---

# Gude Systems Smart PDU Control Spec

## Summary
HTTP/HTTPS CGI + JSON control interface for Gude Expert Power Control (EPC) series PDUs. Switching of power outputs, input configuration, network, HTTP, SNMP, syslog, and e-mail configuration are driven by HTTP-GET requests with CGI query parameters; status and configuration data are exposed as JSON via `statusjsn.js` and `cfgjsn.js`. Optional HTTP Basic Authentication protects the interface.

<!-- UNRESOLVED: device model variants / output counts (N) and firmware version not stated in this excerpt. -->

## Transport
```yaml
protocols:
  - http
addressing:
  base_url: "http://<device-ip>/"  # examples use http://192.168.0.2/; HTTPS also supported per Overview
  port: 80  # UNRESOLVED: default stated as 80 in cmd=18 example; configurable via cmd=18 port param
auth:
  type: basic
  # Per HTTP authentication section: HTTP password protection (cmd=18 pwd=1) enables Basic Auth;
  # 401 returned if missing/wrong. Two accounts: "admin" and "user".
  # UNRESOLVED: username/password values not stated in source.
```

## Traits
```yaml
- powerable  # inferred from cmd=1 (switching output on/off) and Reset command
- routable   # inferred from per-output port selection p=[1..N] in cmd=1
- queryable  # inferred from statusjsn.js / cfgjsn.js JSON status reads
```

## Actions
```yaml
- id: output_switch
  label: Output Switching (easy)
  kind: action
  command: "GET /ov.html?cmd=1&p={port}&s={state}"  # cmd=1 simple switch; ov.html variant skips user auth if sprp=0
  params:
    - name: port
      type: integer
      description: Output (power port) number, 1-based, range [1..N]
    - name: state
      type: integer
      enum: [0, 1]
      description: "0: Switch off, 1: Switch on"

- id: output_batch_start
  label: Output Batch Mode (start)
  kind: action
  command: "GET /?cmd=5&p={port}&a1={a1}&a2={a2}&s={wait}"
  params:
    - name: port
      type: integer
      description: Output number [1..N]
    - name: a1
      type: integer
      enum: [0, 1]
      description: "Action 1: 0=off, 1=on"
    - name: a2
      type: integer
      enum: [0, 1]
      description: "Action 2: 0=off, 1=on"
    - name: wait
      type: integer
      description: Waiting time in seconds between Action 1 and Action 2 [1..65535]

- id: output_batch_cancel
  label: Cancel Batch Mode
  kind: action
  command: "GET /?cmd=2&p={port}"
  params:
    - name: port
      type: integer
      description: Output number [1..N]

- id: output_reset
  label: Output Reset (power-cycle)
  kind: action
  command: "GET /?cmd=12&p={port}"
  params:
    - name: port
      type: integer
      description: Output number [1..N] on which to perform reset (turns off, then on after configured `reset` duration)

- id: configure_output
  label: Configure Output (Power Port)
  kind: action
  command: "GET /?cmd=3&p={port}&name={name}&powup={powup}&powrem={powrem}&idle={idle}&on_again={on_again}&reset={reset}&we={we}&wip={wip}&wt={wt}&wport={wport}&wint={wint}&wret={wret}"
  params:
    - name: port
      type: integer
      description: Output number [1..N]
    - name: name
      type: string
      description: Output name (max 15 chars)
    - name: powup
      type: integer
      enum: [0, 1]
      description: "0=leave off after device start, 1=switch on after device start"
    - name: powrem
      type: integer
      enum: [0, 1]
      description: "0=don't remember switching state, 1=remember switching state for next device start"
    - name: idle
      type: integer
      description: Seconds to wait after device start before switching on [0..N]; 0=no idle
    - name: on_again
      type: integer
      description: Seconds after switching off before auto switch back on [0..N]; 0=no auto re-on
    - name: reset
      type: integer
      description: Reset duration (power-down phase in seconds) [1..N]
    - name: we
      type: integer
      enum: [0, 1]
      description: "0=Watchdog off, 1=Watchdog on"
    - name: wip
      type: string
      description: Hostname (FQDN) or IP of host to monitor
    - name: wt
      type: integer
      enum: [0, 1]
      description: "0=ICMP pings, 1=TCP handshakes"
    - name: wport
      type: integer
      description: TCP port number if wt=1 [1..65535]
    - name: wint
      type: integer
      description: Watchdog ping interval (seconds) [1..65535]
    - name: wret
      type: integer
      description: Watchdog ping retry count [1..65535]

- id: configure_input
  label: Configure Input
  kind: action
  command: "GET /?cmd=13&p={port}&name={name}&hitext={hitext}&lowtext={lowtext}&inverted={inverted}&msgt={msgt}"
  params:
    - name: port
      type: integer
      description: Input number [1..N]
    - name: name
      type: string
      description: Input name (max 15 chars)
    - name: hitext
      type: string
      description: Logical-1 label (max 15 chars)
    - name: lowtext
      type: string
      description: Logical-0 label (max 15 chars)
    - name: inverted
      type: integer
      enum: [0, 1]
      description: "1=invert physical state"
    - name: msgt
      type: integer
      enum: [0, 1]
      description: "1=generate messages (syslog/mail/SNMP-trap) on input changes"

- id: configure_ipv4
  label: Configure IPv4 Network
  kind: action
  command: "GET /?cmd=4&host={host}&ip={ip}&nm={nm}&gw={gw}&dns={dns}&dhcp={dhcp}"
  params:
    - name: host
      type: string
      description: Host name / FQDN (max 15 chars)
    - name: ip
      type: string
      description: IPv4 address
    - name: nm
      type: string
      description: IPv4 network mask
    - name: gw
      type: string
      description: IPv4 gateway
    - name: dns
      type: string
      description: IPv4 DNS server
    - name: dhcp
      type: integer
      enum: [0, 1]
      description: "0=DHCP off, 1=start DHCP after device start"

- id: configure_ipacl
  label: Configure IP-ACL
  kind: action
  command: "GET /?cmd=6&ping={ping}&acl={acl}&ipsec0={ipsec0}&ipsec1={ipsec1}&ipsec2={ipsec2}&ipsec3={ipsec3}&ipsec4={ipsec4}&ipsec5={ipsec5}&ipsec6={ipsec6}&ipsec7={ipsec7}"
  params:
    - name: ping
      type: integer
      enum: [0, 1]
      description: "0=ignore ICMP Echo-Request, 1=reply to ICMP Echo-Request"
    - name: acl
      type: integer
      enum: [0, 1]
      description: "0=IP filter off, 1=IP filter on (only ipsec0..ipsec7 allowed)"
    - name: ipsec0
      type: string
      description: Allowed host/network in CIDR (max 18 chars)
    - name: ipsec1
      type: string
    - name: ipsec2
      type: string
    - name: ipsec3
      type: string
    - name: ipsec4
      type: string
    - name: ipsec5
      type: string
    - name: ipsec6
      type: string
    - name: ipsec7
      type: string

- id: configure_http
  label: Configure HTTP
  kind: action
  command: "GET /?cmd=18&apwd={apwd}&upwd={upwd}&port={port}&pwd={pwd}&refr={refr}&sprp={sprp}"
  params:
    - name: apwd
      type: string
      description: Password for 'admin' (max 15 chars)
    - name: upwd
      type: string
      description: Password for 'user' (max 15 chars)
    - name: port
      type: integer
      description: HTTP server port [1..65535]
    - name: pwd
      type: integer
      enum: [0, 1]
      description: "0=HTTP auth off, 1=HTTP Basic Auth on"
    - name: refr
      type: integer
      enum: [0, 1]
      description: "0=auto-refresh off, 1=auto-refresh on (browser status)"
    - name: sprp
      type: integer
      enum: [0, 1]
      description: "0=don't require user auth for ov.html, 1=require user auth for ov.html"

- id: configure_snmp
  label: Configure SNMP
  kind: action
  command: "GET /?cmd=8&get={get}&set={set}&trap={trap}&cpub={cpub}&cpriv={cpriv}&trapv={trapv}&tr0={tr0}&tr1={tr1}&tr2={tr2}&tr3={tr3}&tr4={tr4}&tr5={tr5}&tr6={tr6}&tr7={tr7}"
  params:
    - name: get
      type: integer
      enum: [0, 1]
      description: "0=no SNMP-Get responses, 1=answer SNMP-Get"
    - name: set
      type: integer
      enum: [0, 1]
      description: "0=no SNMP-Set responses, 1=answer SNMP-Set"
    - name: trap
      type: integer
      enum: [0, 1]
      description: "0=no traps, 1=send traps"
    - name: cpub
      type: string
      description: Public community name (max 15 chars)
    - name: cpriv
      type: string
      description: Private community name (max 15 chars)
    - name: trapv
      type: integer
      enum: [1, 2]
      description: "1=SNMPv1 traps, 2=SNMPv2 traps"
    - name: tr0
      type: string
      description: IPv4/FQDN of trap receiver (max 100 chars); optional :port
    - name: tr1
      type: string
    - name: tr2
      type: string
    - name: tr3
      type: string
    - name: tr4
      type: string
    - name: tr5
      type: string
    - name: tr6
      type: string
    - name: tr7
      type: string

- id: configure_syslog
  label: Configure Syslog
  kind: action
  command: "GET /?cmd=17&syslog={syslog}&slgsrv={slgsrv}"
  params:
    - name: syslog
      type: integer
      enum: [0, 1]
      description: "0=syslog off, 1=send syslog"
    - name: slgsrv
      type: string
      description: IPv4/FQDN of syslog server (max 100 chars); optional :port

- id: configure_email
  label: Configure E-Mail
  kind: action
  command: "GET /?cmd=15&mail={mail}&auth={auth}&mailsrv={mailsrv}&sender={sender}&email={email}"
  params:
    - name: mail
      type: integer
      enum: [0, 1]
      description: "0=email off, 1=email notifications on"
    - name: auth
      type: integer
      enum: [0, 1]
      description: "0=no SMTP auth, 1=SMTP AUTH PLAIN"
    - name: mailsrv
      type: string
      description: SMTP server IPv4/FQDN (max 100 chars); optional :port
    - name: sender
      type: string
      description: From address (max 100 chars)
    - name: email
      type: string
      description: To address (max 100 chars)

- id: reset_device
  label: Reset Device
  kind: action
  command: "GET /?cmd=39"  # cmd=39 reset device; power ports and config remain untouched
  params: []

- id: upload_firmware
  label: Firmware Upload
  kind: action
  command: "POST /fwupdate.html?type=0"  # multipart/form-data body=file (bin); REQUIRES cmd=39 reset after upload
  params:
    - name: file
      type: binary
      description: Firmware binary

- id: upload_ssl_certificate
  label: SSL Certificate Upload
  kind: action
  command: "POST /fwupdate.html?type=1"  # multipart/form-data body=file (pem); REQUIRES cmd=39 reset after upload
  params:
    - name: file
      type: binary
      description: PEM certificate

- id: upload_config
  label: Config Upload
  kind: action
  command: "POST /fwupdate.html?type=2"  # multipart/form-data body=file (txt); REQUIRES cmd=39 reset after upload
  params:
    - name: file
      type: binary
      description: Config text file

- id: get_status_outputs
  label: Status - Outputs
  kind: query
  command: "GET /statusjsn.js?components=1"  # Bit-0
  params: []

- id: get_status_inputs
  label: Status - Inputs
  kind: query
  command: "GET /statusjsn.js?components=2"  # Bit-1
  params: []

- id: get_status_dns_cache
  label: Status - DNS Cache
  kind: query
  command: "GET /statusjsn.js?components=4"  # Bit-2
  params: []

- id: get_status_ethernet
  label: Status - Ethernet
  kind: query
  command: "GET /statusjsn.js?components=8"  # Bit-3
  params: []

- id: get_status_misc
  label: Status - Miscellaneous (firmware, bootloader)
  kind: query
  command: "GET /statusjsn.js?components=16"  # Bit-4
  params: []

- id: get_status_events
  label: Status - Events Counter
  kind: query
  command: "GET /statusjsn.js?components=128"  # Bit-7
  params: []

- id: get_status_port_summary
  label: Status - Port Summary
  kind: query
  command: "GET /statusjsn.js?components=256"  # Bit-8
  params: []

- id: get_status_hardware
  label: Status - Hardware Summary
  kind: query
  command: "GET /statusjsn.js?components=512"  # Bit-9
  params: []

- id: get_status_gsm
  label: Status - GSM Status (GSM products only)
  kind: query
  command: "GET /statusjsn.js?components=1024"  # Bit-10
  params: []

- id: get_status_gsm_log
  label: Status - GSM Call Log (GSM products only)
  kind: query
  command: "GET /statusjsn.js?components=2048"  # Bit-11
  params: []

- id: get_status_gsm_counters
  label: Status - GSM Counters (GSM products only)
  kind: query
  command: "GET /statusjsn.js?components=4096"  # Bit-12
  params: []

- id: get_status_sim
  label: Status - SIM Card (GSM products only)
  kind: query
  command: "GET /statusjsn.js?components=8192"  # Bit-13
  params: []

- id: get_status_sensor_values
  label: Status - Sensor Values
  kind: query
  command: "GET /statusjsn.js?components=16384"  # Bit-14; see HTTP_JSON_Sensor_Data
  params: []

- id: get_status_sensor_descr
  label: Status - Sensor Description
  kind: query
  command: "GET /statusjsn.js?components=65536"  # Bit-16; see HTTP_JSON_Sensor_Data
  params: []

- id: get_status_all
  label: Status - All Status (mask 0x3fffffff)
  kind: query
  command: "GET /statusjsn.js?components=1073741823"  # all status bits
  params: []

- id: get_status_html
  label: Status - Full HTML Hierarchy
  kind: query
  command: "GET /status.html"  # all status + all config, rendered as HTML
  params: []

- id: get_cfg_mail
  label: Config - Mail
  kind: query
  command: "GET /cfgjsn.js?components=2"  # Bit-1
  params: []

- id: get_cfg_http
  label: Config - HTTP Server
  kind: query
  command: "GET /cfgjsn.js?components=4"  # Bit-2
  params: []

- id: get_cfg_messages
  label: Config - Messages
  kind: query
  command: "GET /cfgjsn.js?components=32"  # Bit-5
  params: []

- id: get_cfg_syslog
  label: Config - Syslog
  kind: query
  command: "GET /cfgjsn.js?components=64"  # Bit-6
  params: []

- id: get_cfg_port_cfg
  label: Config - Outputs (Power Ports)
  kind: query
  command: "GET /cfgjsn.js?components=128"  # Bit-7
  params: []

- id: get_cfg_ipv4
  label: Config - IPv4
  kind: query
  command: "GET /cfgjsn.js?components=256"  # Bit-8
  params: []

- id: get_cfg_ipacl
  label: Config - IP-ACL
  kind: query
  command: "GET /cfgjsn.js?components=512"  # Bit-9
  params: []

- id: get_cfg_beeper
  label: Config - Beeper
  kind: query
  command: "GET /cfgjsn.js?components=1024"  # Bit-10
  params: []

- id: get_cfg_snmp
  label: Config - SNMP
  kind: query
  command: "GET /cfgjsn.js?components=2048"  # Bit-11
  params: []

- id: get_cfg_input_cfg
  label: Config - Inputs
  kind: query
  command: "GET /cfgjsn.js?components=4096"  # Bit-12
  params: []

- id: get_cfg_gsm_codes
  label: Config - GSM Codes (GSM products)
  kind: query
  command: "GET /cfgjsn.js?components=8192"  # Bit-13
  params: []

- id: get_cfg_gsm_numbers
  label: Config - GSM Numbers (GSM products)
  kind: query
  command: "GET /cfgjsn.js?components=16384"  # Bit-14
  params: []

- id: get_cfg_gsm_phonebook
  label: Config - GSM Phonebook (GSM products)
  kind: query
  command: "GET /cfgjsn.js?components=32768"  # Bit-15
  params: []

- id: get_cfg_gsm_flags
  label: Config - GSM Flags (GSM products)
  kind: query
  command: "GET /cfgjsn.js?components=65536"  # Bit-16
  params: []

- id: get_cfg_gsm_provider
  label: Config - GSM Provider (GSM products)
  kind: query
  command: "GET /cfgjsn.js?components=131072"  # Bit-17
  params: []
```

## Feedbacks
```yaml
- id: output_state
  type: enum
  values: [0, 1]
  description: Per-output switching state from status['outputs'][n].state (0=off, 1=on)

- id: output_name
  type: string
  description: Per-output label from status['outputs'][n].name (e.g. "Power Port 1")

- id: output_type
  type: enum
  values: [1, 2]
  description: status['outputs'][n].type - 1=Power Port, 2=GPIO output

- id: output_batch
  type: object
  description: |
    status['outputs'][n].batch array - [total_wait_sec, remaining_wait_sec,
    switching_sequence (binary), total_cmd_count, current_cmd_index, batch_reason]

- id: port_summary
  type: object
  description: Summarized status of outputs and inputs (components=256)

- id: hardware_summary
  type: object
  description: Summarized general hardware status (components=512)

- id: ethernet_counters
  type: object
  description: Ethernet status / counter (components=8)

- id: dns_cache
  type: object
  description: Active DNS cache contents (components=4)

- id: misc_info
  type: object
  description: Firmware version, bootloader version, etc. (components=16)

- id: events_counter
  type: object
  description: Message-events counter (components=128)

- id: input_state
  type: object
  description: Internal inputs status (components=2)

- id: sensor_values
  type: object
  description: Actual sensor values (components=16384); see HTTP_JSON_Sensor_Data

- id: sensor_descr
  type: object
  description: Sensor field description (components=65536); see HTTP_JSON_Sensor_Data
```

## Variables
```yaml
# All config-side CGI parameters from the Actions section above are also readable
# as JSON via cfgjsn.js. Listed here for cross-reference; modifiable via the
# configure_* actions in the Actions section.
# - output_name         (string, max 15 chars)        cfgjsn.js port_cfg
# - output_powup        (0|1)                          cfgjsn.js port_cfg
# - output_powrem       (0|1)                          cfgjsn.js port_cfg
# - output_idle         (seconds)                      cfgjsn.js port_cfg
# - output_on_again     (seconds)                      cfgjsn.js port_cfg
# - output_reset_dur    (seconds)                      cfgjsn.js port_cfg
# - watchdog_enabled    (0|1)                          cfgjsn.js port_cfg
# - watchdog_host       (string)                       cfgjsn.js port_cfg
# - watchdog_type       (0=ICMP, 1=TCP)                cfgjsn.js port_cfg
# - watchdog_port       (1..65535)                     cfgjsn.js port_cfg
# - watchdog_interval   (seconds)                      cfgjsn.js port_cfg
# - watchdog_retries    (count)                        cfgjsn.js port_cfg
# - input_name          (string, max 15)               cfgjsn.js input_cfg
# - input_hitext        (string, max 15)               cfgjsn.js input_cfg
# - input_lowtext       (string, max 15)               cfgjsn.js input_cfg
# - input_inverted      (0|1)                          cfgjsn.js input_cfg
# - input_msgs          (0|1)                          cfgjsn.js input_cfg
# - ipv4_host           (string, max 15)               cfgjsn.js ipv4
# - ipv4_ip             (string)                       cfgjsn.js ipv4
# - ipv4_nm             (string)                       cfgjsn.js ipv4
# - ipv4_gw             (string)                       cfgjsn.js ipv4
# - ipv4_dns            (string)                       cfgjsn.js ipv4
# - ipv4_dhcp           (0|1)                          cfgjsn.js ipv4
# - ipacl_ping          (0|1)                          cfgjsn.js ipacl
# - ipacl_enabled       (0|1)                          cfgjsn.js ipacl
# - ipacl_entries       (8x string, max 18)            cfgjsn.js ipacl
# - http_admin_pwd      (string, max 15)               cfgjsn.js http
# - http_user_pwd       (string, max 15)               cfgjsn.js http
# - http_port           (1..65535)                     cfgjsn.js http
# - http_auth           (0|1)                          cfgjsn.js http
# - http_autorefresh    (0|1)                          cfgjsn.js http
# - http_startpage_auth (0|1)                          cfgjsn.js http
# - snmp_get            (0|1)                          cfgjsn.js snmp
# - snmp_set            (0|1)                          cfgjsn.js snmp
# - snmp_trap           (0|1)                          cfgjsn.js snmp
# - snmp_community_pub  (string, max 15)               cfgjsn.js snmp
# - snmp_community_priv (string, max 15)               cfgjsn.js snmp
# - snmp_trap_version   (1|2)                          cfgjsn.js snmp
# - snmp_trap_targets   (8x string, max 100)           cfgjsn.js snmp
# - syslog_enabled      (0|1)                          cfgjsn.js syslog
# - syslog_server       (string, max 100)              cfgjsn.js syslog
# - mail_enabled        (0|1)                          cfgjsn.js mail
# - mail_auth           (0|1)                          cfgjsn.js mail
# - mail_server         (string, max 100)              cfgjsn.js mail
# - mail_sender         (string, max 100)              cfgjsn.js mail
# - mail_recipient      (string, max 100)              cfgjsn.js mail
```

## Events
```yaml
# UNRESOLVED: source describes an "events" JSON object (message-events counter,
# components=128) but does not document an unsolicited push/notification channel.
# No MQTT/Webhook/SNMP-trap payload schema is in this excerpt; SNMP-traps are
# configured via cmd=8 but their payload structure is not documented here.
```

## Macros
```yaml
# - reset (output): two-step sequence (off → wait reset seconds → on),
#   invoked via cmd=12; wait duration is the configured `reset` parameter
#   on the target output (cmd=3 reset=...).
```

## Safety
```yaml
confirmation_required_for:
  - reset_device        # cmd=39 device reset
  - output_reset        # cmd=12 power-cycle
  - upload_firmware     # cmd=39 reset required after upload per source note
  - upload_ssl_certificate
  - upload_config
interlocks: []
# UNRESOLVED: source notes firmware/SSL/config uploads "REQUIRES Reset_device after upload"
# but does not state additional electrical safety interlocks, lockout/tagout,
# or power-on sequencing requirements beyond the upload-then-reset rule above.
```

## Notes
- HTTP API is REST Level 1 compliant per source — GET requests only; mutating state uses CGI query parameters.
- `cmd=18 pwd=1` enables HTTP Basic Auth. Server replies HTTP 401 if Basic Auth header is missing or password wrong. Two accounts: `user` and `admin`. `cmd=18 sprp=1` additionally requires user auth for `ov.html`.
- Output count N is device-specific and not stated in this excerpt — `p` parameter accepts `[1..N]`.
- `cmd=12` (output reset) is a preconfigured batch: power-down for `reset` seconds, then power-up.
- CGI parameter ranges stated verbatim from source; no inferred values for fields marked UNRESOLVED.
- GSM-related status/config components apply only to GSM-equipped EPC variants.

<!-- UNRESOLVED: device-specific output count N, firmware version, default admin/user passwords, and unsolicited event/notification schema are not documented in this source excerpt. -->
````

Spec written. Notes on choices:
- Treated `gude_systems_smart_pdu_companion.refined.md` as the source (closest match to "Smart PDU" — exact file `gude_systems_smart_pdu.refined.md` does not exist).
- Protocol: `http` (Tier 1 direct — CGI/JSON over HTTP stated). Did NOT add `tcp` separately since HTTP runs over TCP and the source never names TCP as a control protocol in its own right.
- Auth: `basic` — explicit source evidence (HTTP Basic Auth section, 401 on failure).
- Port `80`: stated in `cmd=18 port` example; marked with UNRESOLVED note since it's configurable.
- All 14 status bit-mask queries and 14 cfg bit-mask queries enumerated as separate actions per coverage rule.
- `cmd=5` batch start, `cmd=2` batch cancel, `cmd=12` reset all enumerated as distinct actions (source lists them as separate rows).
- GSM-specific endpoints kept (source documents them, even if non-applicable to base EPC).
- No voltage/current/firmware values invented.

## Provenance

```yaml
source_domains:
  - wiki.gude-systems.com
source_urls:
  - https://wiki.gude-systems.com/EPC_HTTP_Interface
retrieved_at: 2026-07-13T23:09:24.781Z
last_checked_at: 2026-08-19T09:22:26.266Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-08-19T09:22:26.266Z
matched_actions: 47
action_count: 47
confidence: medium
summary: "All 47 spec actions map to distinct cmd=N opcodes, upload endpoints, or statusjsn.js/cfgjsn.js component bits documented verbatim in the source. (6 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "device model variants / output counts (N) and firmware version not stated in this excerpt."
- "default stated as 80 in cmd=18 example; configurable via cmd=18 port param"
- "username/password values not stated in source."
- "source describes an \"events\" JSON object (message-events counter,"
- "source notes firmware/SSL/config uploads \"REQUIRES Reset_device after upload\""
- "device-specific output count N, firmware version, default admin/user passwords, and unsolicited event/notification schema are not documented in this source excerpt."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
