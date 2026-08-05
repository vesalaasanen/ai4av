---
spec_id: admin/gude-expert-power-control
schema_version: ai4av-public-spec-v1
revision: 1
title: "GUDE Expert Power Control Control Spec"
manufacturer: GUDE
model_family: "Expert Power Control"
aliases: []
compatible_with:
  manufacturers:
    - GUDE
  models:
    - "Expert Power Control"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - wiki.gude-systems.com
source_urls:
  - https://wiki.gude-systems.com/EPC_HTTP_Interface
retrieved_at: 2026-07-13T22:56:49.947Z
last_checked_at: 2026-07-21T22:44:12.033Z
generated_at: 2026-07-21T22:44:12.033Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "GSM-specific features are not documented; sensor_values and sensor_descr refer to separate documentation"
  - "event payload formats not detailed in source"
  - "no explicit safety interlock procedures for power cycling"
  - "field structures for inputs, dns_cache, ethernet, misc, events, port_summary, hardware, GSM objects, sensor_values, sensor_descr, and configuration objects are not detailed in this source"
verification:
  verdict: verified
  checked_at: 2026-07-21T22:44:12.033Z
  matched_actions: 49
  action_count: 49
  confidence: medium
  summary: "All 49 spec actions matched literally in source; transport parameters verified; command coverage complete. (4 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-04-17
---

# GUDE Expert Power Control Control Spec

## Summary
Expert Power Control series provides HTTP/HTTPS-based control for power outputs through CGI GET requests and JSON-formatted status and configuration data. Interface is REST Level 1 compliant and supports output switching, batch sequencing, watchdog monitoring, device configuration, and SNMP, Syslog, and E-mail alerts.

<!-- UNRESOLVED: GSM-specific features are not documented; sensor_values and sensor_descr refer to separate documentation -->

## Transport
```yaml
protocols:
  - http
  - tcp
addressing:
  base_url: "/"
  port: 80
  note: HTTP server port is configurable from 1 through 65535 using cmd=18
auth:
  type: basic
  users:
    - user
    - admin
  optional: true
  note: Authentication can be disabled using cmd=18&pwd=0
http:
  methods:
    - GET
    - POST
  status_error_codes:
    unauthorized: 401
  post_content_type: multipart/form-data
```

## Traits
```yaml
- powerable
- queryable
```

## Actions
```yaml
- id: switch_output
  label: Switch Output
  kind: action
  command: "/ov.html?cmd=1&p={p}&s={s}"
  method: GET
  params:
    - name: p
      type: integer
      description: Output number (1-based)
    - name: s
      type: integer
      description: "0: switch off, 1: switch on"

- id: batch_start
  label: Start Batch Mode
  kind: action
  command: "/?cmd=5&p={p}&a1={a1}&a2={a2}&s={s}"
  method: GET
  params:
    - name: p
      type: integer
      description: Output number (1-based)
    - name: a1
      type: integer
      description: "Action 1: 0=off, 1=on"
    - name: a2
      type: integer
      description: "Action 2: 0=off, 1=on"
    - name: s
      type: integer
      description: Wait time in seconds between Action 1 and Action 2; range 1..65535

- id: batch_cancel
  label: Cancel Batch Mode
  kind: action
  command: "/?cmd=2&p={p}"
  method: GET
  params:
    - name: p
      type: integer
      description: Output number (1-based)

- id: reset_output
  label: Reset Output
  kind: action
  command: "/?cmd=12&p={p}"
  method: GET
  params:
    - name: p
      type: integer
      description: Output number (1-based)

- id: configure_output
  label: Configure Output
  kind: action
  command: "/?cmd=3&p={p}&name={name}&powup={powup}&powrem={powrem}&idle={idle}&on_again={on_again}&reset={reset}&we={we}&wip={wip}&wt={wt}&wport={wport}&wint={wint}&wret={wret}"
  method: GET
  params:
    - name: p
      type: integer
      description: Output number (1-based)
    - name: name
      type: string
      description: Output name (maximum 15 characters)
    - name: powup
      type: integer
      description: "0: leave off after device start, 1: switch on after device start"
    - name: powrem
      type: integer
      description: "0: do not remember state, 1: remember state for next start"
    - name: idle
      type: integer
      description: Wait time in seconds after device start before switching on; 0 disables delay
    - name: on_again
      type: integer
      description: Auto-switch-back delay in seconds; 0 disables automatic switching
    - name: reset
      type: integer
      description: Reset power-down duration in seconds
    - name: we
      type: integer
      description: "0: watchdog off, 1: watchdog on"
    - name: wip
      type: string
      description: Hostname or IP address to monitor
    - name: wt
      type: integer
      description: "0: ICMP ping, 1: TCP handshake"
    - name: wport
      type: integer
      description: TCP port when wt=1; range 1..65535
    - name: wint
      type: integer
      description: Watchdog interval in seconds; range 1..65535
    - name: wret
      type: integer
      description: Unanswered probe count required to declare host failed; range 1..65535

- id: configure_input
  label: Configure Input
  kind: action
  command: "/?cmd=13&p={p}&name={name}&hitext={hitext}&lowtext={lowtext}&inverted={inverted}&msgt={msgt}"
  method: GET
  params:
    - name: p
      type: integer
      description: Input number (1-based)
    - name: name
      type: string
      description: Input name (maximum 15 characters)
    - name: hitext
      type: string
      description: Logical-1 condition name (maximum 15 characters)
    - name: lowtext
      type: string
      description: Logical-0 condition name (maximum 15 characters)
    - name: inverted
      type: integer
      description: "0: physical state equals logical state, 1: invert physical state"
    - name: msgt
      type: integer
      description: "0: no messages, 1: generate messages when input condition changes"

- id: configure_ipv4
  label: Configure IPv4
  kind: action
  command: "/?cmd=4&host={host}&ip={ip}&nm={nm}&gw={gw}&dns={dns}&dhcp={dhcp}"
  method: GET
  params:
    - name: host
      type: string
      description: Hostname (maximum 15 characters)
    - name: ip
      type: string
      description: IPv4 address
    - name: nm
      type: string
      description: IPv4 network mask
    - name: gw
      type: string
      description: Gateway IPv4 address
    - name: dns
      type: string
      description: DNS server IPv4 address
    - name: dhcp
      type: integer
      description: "0: DHCP off, 1: start DHCP request after device start"

- id: configure_ip_acl
  label: Configure IP Access Control List
  kind: action
  command: "/?cmd=6&ping={ping}&acl={acl}&ipsec0={ipsec0}&ipsec1={ipsec1}&ipsec2={ipsec2}&ipsec3={ipsec3}&ipsec4={ipsec4}&ipsec5={ipsec5}&ipsec6={ipsec6}&ipsec7={ipsec7}"
  method: GET
  params:
    - name: ping
      type: integer
      description: "0: ignore ICMP Echo Requests, 1: respond to ICMP Echo Requests"
    - name: acl
      type: integer
      description: "0: IP filter off, 1: restrict IPv4 access to ipsec0 through ipsec7"
    - name: ipsec0
      type: string
      description: Allowed host or network in CIDR notation; maximum 18 characters
    - name: ipsec1
      type: string
      description: Allowed host or network in CIDR notation
    - name: ipsec2
      type: string
      description: Allowed host or network in CIDR notation
    - name: ipsec3
      type: string
      description: Allowed host or network in CIDR notation
    - name: ipsec4
      type: string
      description: Allowed host or network in CIDR notation
    - name: ipsec5
      type: string
      description: Allowed host or network in CIDR notation
    - name: ipsec6
      type: string
      description: Allowed host or network in CIDR notation
    - name: ipsec7
      type: string
      description: Allowed host or network in CIDR notation

- id: configure_http
  label: Configure HTTP Server
  kind: action
  command: "/cmd=18&apwd={apwd}&upwd={upwd}&port={port}&pwd={pwd}&refr={refr}&sprp={sprp}"
  method: GET
  params:
    - name: apwd
      type: string
      description: Admin password (maximum 15 characters)
    - name: upwd
      type: string
      description: User password (maximum 15 characters)
    - name: port
      type: integer
      description: HTTP server port; range 1..65535
    - name: pwd
      type: integer
      description: "0: authentication off, 1: HTTP Basic authentication on"
    - name: refr
      type: integer
      description: "0: automatic browser refresh off, 1: automatic browser refresh on"
    - name: sprp
      type: integer
      description: "0: ov.html does not require authentication, 1: ov.html requires authentication"

- id: configure_snmp
  label: Configure SNMP
  kind: action
  command: "/cmd=8&get={get}&set={set}&trap={trap}&cpub={cpub}&cpriv={cpriv}&trapv={trapv}&tr0={tr0}&tr1={tr1}&tr2={tr2}&tr3={tr3}&tr4={tr4}&tr5={tr5}&tr6={tr6}&tr7={tr7}"
  method: GET
  params:
    - name: get
      type: integer
      description: "0: ignore SNMP Get, 1: answer SNMP Get using valid public community"
    - name: set
      type: integer
      description: "0: ignore SNMP Set, 1: answer SNMP Set"
    - name: trap
      type: integer
      description: "0: no traps, 1: send SNMP traps"
    - name: trapv
      type: integer
      description: "1: SNMPv1 traps, 2: SNMPv2 traps"
    - name: cpub
      type: string
      description: Public community name (maximum 15 characters)
    - name: cpriv
      type: string
      description: Private community name (maximum 15 characters)
    - name: tr0
      type: string
      description: Trap receiver IPv4 address or FQDN, optionally followed by alternate port
    - name: tr1
      type: string
      description: Trap receiver 2
    - name: tr2
      type: string
      description: Trap receiver 3
    - name: tr3
      type: string
      description: Trap receiver 4
    - name: tr4
      type: string
      description: Trap receiver 5
    - name: tr5
      type: string
      description: Trap receiver 6
    - name: tr6
      type: string
      description: Trap receiver 7
    - name: tr7
      type: string
      description: Trap receiver 8

- id: configure_syslog
  label: Configure Syslog
  kind: action
  command: "/?cmd=17&syslog={syslog}&slgsrv={slgsrv}"
  method: GET
  params:
    - name: syslog
      type: integer
      description: "0: Syslog off, 1: send Syslog messages"
    - name: slgsrv
      type: string
      description: Syslog server IPv4 address or FQDN, optionally followed by alternate port

- id: configure_email
  label: Configure E-Mail
  kind: action
  command: "/?cmd=15&mail={mail}&auth={auth}&mailsrv={mailsrv}&sender={sender}&email={email}"
  method: GET
  params:
    - name: mail
      type: integer
      description: "0: E-mail notifications off, 1: E-mail notifications on"
    - name: auth
      type: integer
      description: "0: no SMTP authentication, 1: SMTP PLAIN authentication"
    - name: mailsrv
      type: string
      description: SMTP server IPv4 address or FQDN, optionally followed by alternate port
    - name: sender
      type: string
      description: Sender address
    - name: email
      type: string
      description: Receiver address

- id: reset_device
  label: Reset Device
  kind: action
  command: "/?cmd=39"
  method: GET
  params: []
  note: Power ports and configuration remain untouched

- id: firmware_upload
  label: Firmware Upload
  kind: action
  command: "/fwupdate.html?type=0"
  method: POST
  content_type: multipart/form-data
  params:
    - name: file
      type: binary
      description: Firmware file in bin format
  note: Device reset is required after upload

- id: ssl_certificate_upload
  label: SSL Certificate Upload
  kind: action
  command: "/fwupdate.html?type=1"
  method: POST
  content_type: multipart/form-data
  params:
    - name: file
      type: binary
      description: SSL certificate file in pem format
  note: Device reset is required after upload

- id: config_upload
  label: Configuration Upload
  kind: action
  command: "/fwupdate.html?type=2"
  method: POST
  content_type: multipart/form-data
  params:
    - name: file
      type: binary
      description: Configuration file in txt format
  note: Device reset is required after upload

- id: json_status
  label: Get JSON Status
  kind: query
  command: "/statusjsn.js?components={components}"
  method: GET
  params:
    - name: components
      type: integer
      description: Decimal bitmask selecting status components
  returns: JSON object containing selected status components

- id: get_output_status
  label: Get Output Status
  kind: query
  command: "/statusjsn.js?components=1"
  method: GET
  params: []
  returns: JSON outputs object

- id: get_input_status
  label: Get Input Status
  kind: query
  command: "/statusjsn.js?components=2"
  method: GET
  params: []
  returns: JSON inputs object

- id: get_output_and_input_status
  label: Get Output and Input Status
  kind: query
  command: "/statusjsn.js?components=3"
  method: GET
  params: []
  returns: JSON outputs and inputs objects

- id: get_all_status
  label: Get All Status
  kind: query
  command: "/statusjsn.js?components=1073741823"
  method: GET
  params: []
  returns: All status information selected by bitmask 0x3fffffff

- id: get_dns_cache_status
  label: Get DNS Cache Status
  kind: query
  command: "/statusjsn.js?components=4"
  method: GET
  params: []
  returns: JSON dns_cache object

- id: get_ethernet_status
  label: Get Ethernet Status
  kind: query
  command: "/statusjsn.js?components=8"
  method: GET
  params: []
  returns: JSON ethernet object

- id: get_misc_status
  label: Get Miscellaneous Status
  kind: query
  command: "/statusjsn.js?components=16"
  method: GET
  params: []
  returns: JSON misc object

- id: get_event_counters
  label: Get Message Event Counters
  kind: query
  command: "/statusjsn.js?components=128"
  method: GET
  params: []
  returns: JSON events object

- id: get_port_summary
  label: Get Port Summary
  kind: query
  command: "/statusjsn.js?components=256"
  method: GET
  params: []
  returns: JSON port_summary object

- id: get_hardware_status
  label: Get Hardware Status
  kind: query
  command: "/statusjsn.js?components=512"
  method: GET
  params: []
  returns: JSON hardware object

- id: get_gsm_status
  label: Get GSM Status
  kind: query
  command: "/statusjsn.js?components=1024"
  method: GET
  params: []
  returns: JSON gsm_status object for GSM products

- id: get_gsm_log
  label: Get GSM Call Log
  kind: query
  command: "/statusjsn.js?components=2048"
  method: GET
  params: []
  returns: JSON gsm_log object for GSM products

- id: get_gsm_counters
  label: Get GSM Counters
  kind: query
  command: "/statusjsn.js?components=4096"
  method: GET
  params: []
  returns: JSON gsm_counters object for GSM products

- id: get_sim_status
  label: Get SIM Status
  kind: query
  command: "/statusjsn.js?components=8192"
  method: GET
  params: []
  returns: JSON sim object for GSM products

- id: get_sensor_values
  label: Get Sensor Values
  kind: query
  command: "/statusjsn.js?components=16384"
  method: GET
  params: []
  returns: JSON sensor_values object
  note: Field definitions are in separate HTTP JSON Sensor Data documentation

- id: get_sensor_descriptions
  label: Get Sensor Descriptions
  kind: query
  command: "/statusjsn.js?components=65536"
  method: GET
  params: []
  returns: JSON sensor_descr object
  note: Field definitions are in separate HTTP JSON Sensor Data documentation

- id: json_config
  label: Get JSON Configuration
  kind: query
  command: "/cfgjsn.js?components={components}"
  method: GET
  params:
    - name: components
      type: integer
      description: Decimal bitmask selecting configuration components
  returns: JSON object containing selected configuration components; available to admin

- id: get_mail_configuration
  label: Get Mail Configuration
  kind: query
  command: "/cfgjsn.js?components=2"
  method: GET
  params: []
  returns: JSON mail object

- id: get_http_configuration
  label: Get HTTP Configuration
  kind: query
  command: "/cfgjsn.js?components=4"
  method: GET
  params: []
  returns: JSON http object

- id: get_message_configuration
  label: Get Message Configuration
  kind: query
  command: "/cfgjsn.js?components=32"
  method: GET
  params: []
  returns: JSON messages object

- id: get_syslog_configuration
  label: Get Syslog Configuration
  kind: query
  command: "/cfgjsn.js?components=64"
  method: GET
  params: []
  returns: JSON syslog object

- id: get_output_configuration
  label: Get Output Configuration
  kind: query
  command: "/cfgjsn.js?components=128"
  method: GET
  params: []
  returns: JSON port_cfg object

- id: get_ipv4_configuration
  label: Get IPv4 Configuration
  kind: query
  command: "/cfgjsn.js?components=256"
  method: GET
  params: []
  returns: JSON ipv4 object

- id: get_ip_acl_configuration
  label: Get IP Access Control List Configuration
  kind: query
  command: "/cfgjsn.js?components=512"
  method: GET
  params: []
  returns: JSON ipacl object

- id: get_beeper_configuration
  label: Get Beeper Configuration
  kind: query
  command: "/cfgjsn.js?components=1024"
  method: GET
  params: []
  returns: JSON beeper object when beeper is integrated

- id: get_snmp_configuration
  label: Get SNMP Configuration
  kind: query
  command: "/cfgjsn.js?components=2048"
  method: GET
  params: []
  returns: JSON snmp object

- id: get_input_configuration
  label: Get Input Configuration
  kind: query
  command: "/cfgjsn.js?components=4096"
  method: GET
  params: []
  returns: JSON input_cfg object

- id: get_gsm_code_configuration
  label: Get GSM Code Configuration
  kind: query
  command: "/cfgjsn.js?components=8192"
  method: GET
  params: []
  returns: JSON gsm_codes object for GSM products

- id: get_gsm_number_configuration
  label: Get GSM Number Configuration
  kind: query
  command: "/cfgjsn.js?components=16384"
  method: GET
  params: []
  returns: JSON gsm_numbers object for GSM products

- id: get_gsm_phonebook_configuration
  label: Get GSM Phonebook Configuration
  kind: query
  command: "/cfgjsn.js?components=32768"
  method: GET
  params: []
  returns: JSON gsm_phonebook object for GSM products

- id: get_gsm_flag_configuration
  label: Get GSM Flag Configuration
  kind: query
  command: "/cfgjsn.js?components=65536"
  method: GET
  params: []
  returns: JSON gsm_flags object for GSM products

- id: get_gsm_provider_configuration
  label: Get GSM Provider Configuration
  kind: query
  command: "/cfgjsn.js?components=131072"
  method: GET
  params: []
  returns: JSON gsm_provider object for GSM products
```

## Feedbacks
```yaml
- id: output_status
  type: object
  source: "/statusjsn.js?components=1"
  properties:
    - name: name
      type: string
    - name: state
      type: integer
      values: [0, 1]
      description: "0: switched off, 1: switched on"
    - name: type
      type: integer
      values: [0, 1]
      description: "0: Powerport, 1: GPIO output"
    - name: batch
      type: array
      description: Total wait, remaining wait, switching sequence, command count, current command, and Batch mode reason
    - name: wdog
      type: array

- id: input_status
  type: object
  source: "/statusjsn.js?components=2"
  description: Internal input status

- id: dns_cache_status
  type: object
  source: "/statusjsn.js?components=4"
  description: Current DNS cache contents

- id: ethernet_status
  type: object
  source: "/statusjsn.js?components=8"
  description: Ethernet status and counters

- id: misc_status
  type: object
  source: "/statusjsn.js?components=16"
  description: Miscellaneous status including firmware and bootloader versions

- id: event_counters
  type: object
  source: "/statusjsn.js?components=128"
  description: Message-event counters

- id: port_summary
  type: object
  source: "/statusjsn.js?components=256"
  description: Summarized output and input status

- id: hardware_status
  type: object
  source: "/statusjsn.js?components=512"
  description: Summarized general hardware status

- id: gsm_status
  type: object
  source: "/statusjsn.js?components=1024"
  description: GSM product status information

- id: gsm_log
  type: object
  source: "/statusjsn.js?components=2048"
  description: GSM product call log

- id: gsm_counters
  type: object
  source: "/statusjsn.js?components=4096"
  description: Summarized GSM product status

- id: sim_status
  type: object
  source: "/statusjsn.js?components=8192"
  description: SIM card status for GSM products

- id: sensor_values
  type: object
  source: "/statusjsn.js?components=16384"
  description: Current values from available sensors
  note: Field definitions unresolved; source refers to separate sensor documentation

- id: sensor_descriptions
  type: object
  source: "/statusjsn.js?components=65536"
  description: Field descriptions for available sensors
  note: Field definitions unresolved; source refers to separate sensor documentation

- id: unauthorized_response
  type: http_status
  value: 401
  description: Returned when HTTP password protection is active and credentials are missing or incorrect
```

## Variables
```yaml
- id: output_configuration
  type: object
  source: "/cfgjsn.js?components=128"

- id: input_configuration
  type: object
  source: "/cfgjsn.js?components=4096"

- id: ipv4_configuration
  type: object
  source: "/cfgjsn.js?components=256"

- id: ip_acl_configuration
  type: object
  source: "/cfgjsn.js?components=512"

- id: http_configuration
  type: object
  source: "/cfgjsn.js?components=4"

- id: snmp_configuration
  type: object
  source: "/cfgjsn.js?components=2048"

- id: syslog_configuration
  type: object
  source: "/cfgjsn.js?components=64"

- id: mail_configuration
  type: object
  source: "/cfgjsn.js?components=2"

- id: message_configuration
  type: object
  source: "/cfgjsn.js?components=32"

- id: beeper_configuration
  type: object
  source: "/cfgjsn.js?components=1024"
```

## Events
```yaml
- id: input_condition_change
  description: May generate Syslog, E-mail, and SNMP trap messages when input msgt is 1
  formats: []  # UNRESOLVED: event payload formats not detailed in source
```

## Macros
```yaml
- id: output_reset_sequence
  description: Switch output off, wait configured reset duration, then switch output on
  command: "/?cmd=12&p={p}"
```

## Safety
```yaml
confirmation_required_for: []
interlocks:
  - Firmware, SSL certificate, and configuration uploads require a subsequent device reset using cmd=39
# UNRESOLVED: no explicit safety interlock procedures for power cycling
```

## Notes
Commands use HTTP query parameters. Status JSON is available to `user` and `admin`; configuration JSON is available to `admin`. Basic Authentication is required when HTTP password protection is enabled and can be disabled with `cmd=18&pwd=0`. Default HTTP port is 80 and can be changed with `cmd=18`. Raw HTTP requests may be sent as individual TCP packets to the configured HTTP port.

<!-- UNRESOLVED: field structures for inputs, dns_cache, ethernet, misc, events, port_summary, hardware, GSM objects, sensor_values, sensor_descr, and configuration objects are not detailed in this source -->

## Provenance

```yaml
source_domains:
  - wiki.gude-systems.com
source_urls:
  - https://wiki.gude-systems.com/EPC_HTTP_Interface
retrieved_at: 2026-07-13T22:56:49.947Z
last_checked_at: 2026-07-21T22:44:12.033Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-07-21T22:44:12.033Z
matched_actions: 49
action_count: 49
confidence: medium
summary: "All 49 spec actions matched literally in source; transport parameters verified; command coverage complete. (4 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "GSM-specific features are not documented; sensor_values and sensor_descr refer to separate documentation"
- "event payload formats not detailed in source"
- "no explicit safety interlock procedures for power cycling"
- "field structures for inputs, dns_cache, ethernet, misc, events, port_summary, hardware, GSM objects, sensor_values, sensor_descr, and configuration objects are not detailed in this source"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
