---
spec_id: admin/2n-2n-easygate-ip-plus
schema_version: ai4av-public-spec-v1
revision: 1
title: "2N 2N-EASYGATE-IP-PLUS Control Spec"
manufacturer: 2N
model_family: "2N EasyGate IP+"
aliases: []
compatible_with:
  manufacturers:
    - 2N
  models:
    - "2N EasyGate IP+"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - 2n.com
source_urls:
  - https://www.2n.com/en-GB/download-manual/102462-1_6_0
retrieved_at: 2026-07-24T19:35:09.818Z
last_checked_at: 2026-08-05T07:16:53.772Z
generated_at: 2026-08-05T07:16:53.772Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "No native TCP control command protocol or fixed TCP port for Modem over TCP or RS-232 via TCP is stated."
  - "HTTP base URL not stated; web interface uses device IP address and port 8080"
  - "baud rate is configurable but supported values are not stated"
  - "data bits not stated in source"
  - "parity not stated in source"
  - "stop bits not stated in source"
  - "no explicitly documented multi-step control macro found in source"
  - "TCP server port for Modem over TCP and RS-232 via TCP not stated."
  - "RS-232 baud-rate values and complete serial framing configuration not stated."
  - "Native TCP payload syntax for modem and RS-232-over-TCP services not stated."
  - "Firmware compatibility range not stated."
  - "HTTP base URL and request API not stated."
verification:
  verdict: verified
  checked_at: 2026-08-05T07:16:53.772Z
  matched_actions: 59
  action_count: 59
  confidence: medium
  summary: "All 59 spec actions match documented L1/EG SMS commands and parameter assignments; transport port 8080 confirmed. (12 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-07-24
---

# 2N 2N-EASYGATE-IP-PLUS Control Spec

## Summary
2N EasyGate IP+ is a cellular gateway with an authenticated HTTP web configuration interface, TCP modem and RS-232-over-TCP services, RS-232, RS-485, CAN, SMS command control, and SIP signaling over UDP or TLS. This spec covers documented SMS command payloads, responses, events, configurable parameters, and explicitly described transport interfaces.

<!-- UNRESOLVED: No native TCP control command protocol or fixed TCP port for Modem over TCP or RS-232 via TCP is stated. -->

## Transport
```yaml
protocols:
  - http
  - tcp
  - serial
  - udp
addressing:
  port: 8080
  base_url: ""  # UNRESOLVED: HTTP base URL not stated; web interface uses device IP address and port 8080
serial:
  baud_rate: null  # UNRESOLVED: baud rate is configurable but supported values are not stated
  data_bits: null  # UNRESOLVED: data bits not stated in source
  parity: null  # UNRESOLVED: parity not stated in source
  stop_bits: null  # UNRESOLVED: stop bits not stated in source
  flow_control: rts_cts  # inferred from documented RTS and CTS connector terminals
auth:
  type: password
```

## Traits
```yaml
- powerable  # inferred from documented restart commands and power events
- routable  # inferred from relay control and status parameters
- queryable  # inferred from INF and GET query commands
```

## Actions
```yaml
- id: lift1_configuration
  label: LIFT1 Configuration
  kind: action
  command: "L1 CNF <pwr> <p1>=<v1> [<p2>=<v2>[<p3>=<v3>...]]"
  params:
    - name: pwr
      type: string
      description: Authorization or power parameter documented by source
    - name: parameters
      type: string
      description: Space-separated parameter assignments

- id: lift1_factory_default_reset
  label: LIFT1 Factory Default Reset
  kind: action
  command: "L1 DEF <pwd>"
  params:
    - name: pwd
      type: string
      description: Authorization password

- id: lift1_profile_selection
  label: LIFT1 Profile Selection
  kind: action
  command: "L1 SET <pwd> <profile>"
  params:
    - name: pwd
      type: string
      description: Authorization password
    - name: profile
      type: integer
      description: Profile number, 0-19

- id: lift1_restart
  label: LIFT1 Restart
  kind: action
  command: "L1 RST <pwd>"
  params:
    - name: pwd
      type: string
      description: Authorization password

- id: lift1_setup_information
  label: LIFT1 Setup Information
  kind: query
  command: "L1 INF <pwd>"
  params:
    - name: pwd
      type: string
      description: Authorization password

- id: sms_information_reading
  label: SMS Information Reading
  kind: query
  command: "EG INF <pwd>"
  params:
    - name: pwd
      type: string
      description: Authorization password

- id: sms_parameter_reading
  label: SMS Parameter Reading
  kind: query
  command: "EG GET <pwd> <p1> [<p2> [<p3> …]]"
  params:
    - name: pwd
      type: string
      description: Authorization password
    - name: parameters
      type: string
      description: Space-separated parameter identifiers

- id: sms_parameter_change
  label: SMS Parameter Change
  kind: action
  command: "EG SET <pwd> <p1>=<v1> [<p2>=<v2> [<p3>=<v3> …]]"
  params:
    - name: pwd
      type: string
      description: Authorization password
    - name: parameters
      type: string
      description: Space-separated parameter assignments

- id: sms_password_change
  label: SMS Password Change
  kind: action
  command: "EG PWD <pwd> <new_pwd>"
  params:
    - name: pwd
      type: string
      description: Current authorization password
    - name: new_pwd
      type: string
      description: New authorization password

- id: sms_factory_defaults
  label: SMS Factory Defaults
  kind: action
  command: "EG DEF <pwd>"
  params:
    - name: pwd
      type: string
      description: Authorization password

- id: sms_device_restart
  label: SMS Device Restart
  kind: action
  command: "EG RST <pwd>"
  params:
    - name: pwd
      type: string
      description: Authorization password

- id: sms_response
  label: SMS Command Response
  kind: action
  command: "EG [OK|ERR] msg=<msg> cmd=<cmd> seq=<seq>"
  params:
    - name: msg
      type: string
      description: Response message
    - name: cmd
      type: string
      description: Command that responds
    - name: seq
      type: integer
      description: Sequential counter

- id: sms_value_response
  label: SMS Value or Information Response
  kind: action
  command: "EG [VAL|INF] <p1>=<v1> [<p2>=<v2> …]"
  params:
    - name: parameters
      type: string
      description: Space-separated parameter/value pairs

- id: sms_event_power
  label: SMS Power Event
  kind: action
  command: "EG EVT power=[charge|backup|fully|error]"
  params:
    - name: power
      type: enum
      values:
        - charge
        - backup
        - fully
        - error

- id: sms_event_start
  label: SMS Startup Event
  kind: action
  command: "EG EVT start"
  params: []

- id: sms_event_sim_slot
  label: SMS SIM Slot Event
  kind: action
  command: "EG EVT slot=[1|2]"
  params:
    - name: slot
      type: integer
      description: SIM slot number, 1 or 2

- id: sms_event_input
  label: SMS Input Event
  kind: action
  command: "EG EVT input=[0|1] missed=<num>"
  params:
    - name: input
      type: integer
      description: Input state, 0 or 1
    - name: missed
      type: integer
      description: Missed-event count

- id: lift1_response
  label: LIFT1 Command Response
  kind: action
  command: "L1 [OK|ER] msg=<msg> cmd=<cmd> seq=<seq>"
  params:
    - name: msg
      type: string
      description: Response message
    - name: cmd
      type: string
      description: Command that responds
    - name: seq
      type: integer
      description: Sequential counter

- id: sms_enable
  label: Enable SMS Function
  kind: action
  command: "EG SET <pwd> 100=1"
  params:
    - name: pwd
      type: string
      description: Authorization password

- id: sms_disable
  label: Disable SMS Function
  kind: action
  command: "EG SET <pwd> 100=0"
  params:
    - name: pwd
      type: string
      description: Authorization password

- id: sms_device_identification_set
  label: Set SMS Device Identification
  kind: action
  command: "EG SET <pwd> 101=(<identification>)"
  params:
    - name: pwd
      type: string
      description: Authorization password
    - name: identification
      type: string
      description: Device identification text enclosed in parentheses

- id: sms_event_recipient_set
  label: Set SMS Event Recipient
  kind: action
  command: "EG SET <pwd> 102=<phone>"
  params:
    - name: pwd
      type: string
      description: Authorization password
    - name: phone
      type: string
      description: Event recipient phone number

- id: sms_initial_password_source_set
  label: Set Initial Password Source
  kind: action
  command: "EG SET <pwd> 103=<source>"
  params:
    - name: pwd
      type: string
      description: Authorization password
    - name: source
      type: integer
      description: 0 Security Code, 1 Serial Number, 2 IMSI, 3 ICCID, or 4 IMEI

- id: sms_def_rst_time_limit_set
  label: Set DEF and RST Time Limit
  kind: action
  command: "EG SET <pwd> 104=<minutes>"
  params:
    - name: pwd
      type: string
      description: Authorization password
    - name: minutes
      type: integer
      range: 0-1440

- id: sms_info_period_set
  label: Set INF Message Period
  kind: action
  command: "EG SET <pwd> 105=<minutes>"
  params:
    - name: pwd
      type: string
      description: Authorization password
    - name: minutes
      type: integer
      range: 0-10080

- id: sms_info_format_set
  label: Set INF Message Format
  kind: action
  command: "EG SET <pwd> 106=(<parameter_identifiers>)"
  params:
    - name: pwd
      type: string
      description: Authorization password
    - name: parameter_identifiers
      type: string
      description: Space-separated parameter identifiers enclosed in parentheses

- id: sms_power_events_set
  label: Set Power Change Events
  kind: action
  command: "EG SET <pwd> 120=<enabled>"
  params:
    - name: pwd
      type: string
      description: Authorization password
    - name: enabled
      type: integer
      description: 0 for no, 1 for yes

- id: sms_supervisor_events_set
  label: Set Supervisor Events
  kind: action
  command: "EG SET <pwd> 121=<enabled>"
  params:
    - name: pwd
      type: string
      description: Authorization password
    - name: enabled
      type: integer
      description: 0 for no, 1 for yes

- id: sms_startup_events_set
  label: Set Device Startup Events
  kind: action
  command: "EG SET <pwd> 122=<enabled>"
  params:
    - name: pwd
      type: string
      description: Authorization password
    - name: enabled
      type: integer
      description: 0 for no, 1 for yes

- id: sms_sim_change_events_set
  label: Set SIM Change Events
  kind: action
  command: "EG SET <pwd> 123=<enabled>"
  params:
    - name: pwd
      type: string
      description: Authorization password
    - name: enabled
      type: integer
      description: 0 for no, 1 for yes

- id: sms_input_trigger_set
  label: Set Digital Input Trigger
  kind: action
  command: "EG SET <pwd> 130=<mode>"
  params:
    - name: pwd
      type: string
      description: Authorization password
    - name: mode
      type: integer
      description: 0 OFF, 1 POS, 2 NEG, or 3 BOTH

- id: sms_input_threshold_set
  label: Set Digital Input Activation Time
  kind: action
  command: "EG SET <pwd> 131=<milliseconds>"
  params:
    - name: pwd
      type: string
      description: Authorization password
    - name: milliseconds
      type: integer
      range: 100-10000

- id: sms_input_timeout_set
  label: Set Digital Input Next Event Time
  kind: action
  command: "EG SET <pwd> 132=<seconds>"
  params:
    - name: pwd
      type: string
      description: Authorization password
    - name: seconds
      type: integer
      range: 1-86400

- id: sms_inf_command_permission_set
  label: Set INF Command Permission
  kind: action
  command: "EG SET <pwd> 140=<enabled>"
  params:
    - name: pwd
      type: string
      description: Authorization password
    - name: enabled
      type: integer
      description: 0 for no, 1 for yes

- id: sms_get_command_permission_set
  label: Set GET Command Permission
  kind: action
  command: "EG SET <pwd> 141=<enabled>"
  params:
    - name: pwd
      type: string
      description: Authorization password
    - name: enabled
      type: integer
      description: 0 for no, 1 for yes

- id: sms_set_command_permission_set
  label: Set SET Command Permission
  kind: action
  command: "EG SET <pwd> 142=<enabled>"
  params:
    - name: pwd
      type: string
      description: Authorization password
    - name: enabled
      type: integer
      description: 0 for no, 1 for yes

- id: sms_pwd_command_permission_set
  label: Set PWD Command Permission
  kind: action
  command: "EG SET <pwd> 143=<enabled>"
  params:
    - name: pwd
      type: string
      description: Authorization password
    - name: enabled
      type: integer
      description: 0 for no, 1 for yes

- id: sms_def_command_permission_set
  label: Set DEF Command Permission
  kind: action
  command: "EG SET <pwd> 144=<enabled>"
  params:
    - name: pwd
      type: string
      description: Authorization password
    - name: enabled
      type: integer
      description: 0 for no, 1 for yes

- id: sms_rst_command_permission_set
  label: Set RST Command Permission
  kind: action
  command: "EG SET <pwd> 145=<enabled>"
  params:
    - name: pwd
      type: string
      description: Authorization password
    - name: enabled
      type: integer
      description: 0 for no, 1 for yes

- id: my2n_service_set
  label: Set My2N Service
  kind: action
  command: "EG SET <pwd> 150=<enabled>"
  params:
    - name: pwd
      type: string
      description: Authorization password
    - name: enabled
      type: integer
      description: 0 for off, 1 for on

- id: my2n_extended_protocol_set
  label: Set My2N Extended Protocol
  kind: action
  command: "EG SET <pwd> 156=<enabled>"
  params:
    - name: pwd
      type: string
      description: Authorization password
    - name: enabled
      type: integer
      description: 0 for no, 1 for yes

- id: my2n_certificate_delete
  label: Delete My2N Certificate
  kind: action
  command: "EG SET <pwd> 165=1"
  params:
    - name: pwd
      type: string
      description: Authorization password

- id: mobile_data_set
  label: Set Mobile Data
  kind: action
  command: "EG SET <pwd> 200=<enabled>"
  params:
    - name: pwd
      type: string
      description: Authorization password
    - name: enabled
      type: integer
      description: 0 for no, 1 for yes

- id: sim1_slot_set
  label: Set SIM1 Slot
  kind: action
  command: "EG SET <pwd> 220=<enabled>"
  params:
    - name: pwd
      type: string
      description: Authorization password
    - name: enabled
      type: integer
      description: 0 for disabled, 1 for enabled

- id: sim1_pin_set
  label: Set SIM1 PIN
  kind: action
  command: "EG SET <pwd> 222=<pin>"
  params:
    - name: pwd
      type: string
      description: Authorization password
    - name: pin
      type: string
      description: SIM1 PIN

- id: sim1_apn_name_set
  label: Set SIM1 APN
  kind: action
  command: "EG SET <pwd> 223=(<apn>)"
  params:
    - name: pwd
      type: string
      description: Authorization password
    - name: apn
      type: string
      description: SIM1 APN enclosed in parentheses

- id: sim1_apn_auth_type_set
  label: Set SIM1 APN Authentication Type
  kind: action
  command: "EG SET <pwd> 224=<auth_type>"
  params:
    - name: pwd
      type: string
      description: Authorization password
    - name: auth_type
      type: integer
      description: 0 NONE, 1 PAP, 2 CHAP, or 3 PAP-CHAP

- id: sim1_apn_username_set
  label: Set SIM1 APN Username
  kind: action
  command: "EG SET <pwd> 225=(<username>)"
  params:
    - name: pwd
      type: string
      description: Authorization password
    - name: username
      type: string
      description: SIM1 APN username enclosed in parentheses

- id: sim1_apn_password_set
  label: Set SIM1 APN Password
  kind: action
  command: "EG SET <pwd> 226=(<password>)"
  params:
    - name: pwd
      type: string
      description: Authorization password
    - name: password
      type: string
      description: SIM1 APN password enclosed in parentheses

- id: sim2_slot_set
  label: Set SIM2 Slot
  kind: action
  command: "EG SET <pwd> 240=<enabled>"
  params:
    - name: pwd
      type: string
      description: Authorization password
    - name: enabled
      type: integer
      description: 0 for disabled, 1 for enabled

- id: sim2_pin_set
  label: Set SIM2 PIN
  kind: action
  command: "EG SET <pwd> 242=<pin>"
  params:
    - name: pwd
      type: string
      description: Authorization password
    - name: pin
      type: string
      description: SIM2 PIN

- id: sim2_apn_name_set
  label: Set SIM2 APN
  kind: action
  command: "EG SET <pwd> 243=(<apn>)"
  params:
    - name: pwd
      type: string
      description: Authorization password
    - name: apn
      type: string
      description: SIM2 APN enclosed in parentheses

- id: sim2_apn_auth_type_set
  label: Set SIM2 APN Authentication Type
  kind: action
  command: "EG SET <pwd> 244=<auth_type>"
  params:
    - name: pwd
      type: string
      description: Authorization password
    - name: auth_type
      type: integer
      description: 0 NONE, 1 PAP, 2 CHAP, or 3 PAP-CHAP

- id: sim2_apn_username_set
  label: Set SIM2 APN Username
  kind: action
  command: "EG SET <pwd> 245=(<username>)"
  params:
    - name: pwd
      type: string
      description: Authorization password
    - name: username
      type: string
      description: SIM2 APN username enclosed in parentheses

- id: sim2_apn_password_set
  label: Set SIM2 APN Password
  kind: action
  command: "EG SET <pwd> 246=(<password>)"
  params:
    - name: pwd
      type: string
      description: Authorization password
    - name: password
      type: string
      description: SIM2 APN password enclosed in parentheses

- id: external_input_query
  label: Query External Input
  kind: query
  command: "EG GET <pwd> 300"
  params:
    - name: pwd
      type: string
      description: Authorization password

- id: relay_activate
  label: Activate Relay
  kind: action
  command: "EG SET <pwd> 301=1"
  params:
    - name: pwd
      type: string
      description: Authorization password

- id: relay_deactivate
  label: Deactivate Relay
  kind: action
  command: "EG SET <pwd> 302=1"
  params:
    - name: pwd
      type: string
      description: Authorization password

- id: relay_state_query
  label: Query Relay State
  kind: query
  command: "EG GET <pwd> 303"
  params:
    - name: pwd
      type: string
      description: Authorization password
```

## Feedbacks
```yaml
- id: lift1_success_response
  type: enum
  values:
    - "L1 CNF OK"
    - "L1 DEF OK"
    - "L1 SET OK"
    - "L1 RST OK"

- id: lift1_error_response
  type: enum
  values:
    - "L1 ERR Invalid Message"
    - "L1 ERR Unknown Command"
    - "L1 ERR Invalid Password"
    - "L1 ERR Invalid Parameters"
    - "L1 ERR Invalid Syntax"
    - "L1 ERR Does not Respond"

- id: lift1_information_response
  type: string
  pattern: 'L1 INF sn="<s/n>" hw="<version no.>" cust="<n>" app="<fw no.>" bl="<bl no.>" vm="<voice menu>"'

- id: sms_success_response
  type: enum
  values:
    - "EG SET OK"

- id: sms_error_response
  type: enum
  values:
    - "EG ERR Unknown Command"
    - "EG ERR Password"
    - "EG ERR Invalid Parameters"
    - "EG ERR Invalid Syntax"

- id: sms_information_response
  type: string
  description: INF response can include serial number, firmware version, IMEI, IMSI, roaming state, signal strength, mains status, battery status, and battery replacement time.

- id: relay_state
  type: enum
  values:
    - Activated
    - Deactivated

- id: external_input_state
  type: enum
  values:
    - 0
    - 1

- id: my2n_state
  type: enum
  values:
    - RELAX
    - IDLE
    - STOPPING
    - STOPPED
    - RESTART
    - READY
    - CRT
    - TUN

- id: sip_state
  type: string
  description: SIP registration status; exact state values unresolved.

- id: tcp_connection_state
  type: string
  description: TCP connection status; exact state values unresolved.

- id: rs232_connection_state
  type: enum
  values:
    - Closed
    - Open
    - Active
```

## Variables
```yaml
- id: sms_parameter
  label: SMS-configurable Parameter
  type: string
  description: Numeric and text identifiers from the parameter list can be read with EG GET and changed with EG SET where configurable.

- id: relay_state
  label: Relay State
  type: enum
  values:
    - Activated
    - Deactivated

- id: external_input
  label: External Input
  type: integer
  values:
    - 0
    - 1

- id: rs232_baud_rate
  label: RS-232 Baud Rate
  type: integer
  description: Settable serial communication rate; supported values are not stated in source.

- id: tcp_server_name
  label: TCP Server Name
  type: string

- id: tcp_server_port
  label: TCP Server Port
  type: integer
  description: Port is configurable, but no default or fixed value is stated.

- id: web_configuration_port
  label: Web Configuration Port
  type: integer
  value: 8080

- id: sip_server_port
  label: SIP Server Port
  type: integer
  description: Value 0 obtains port from the DNS service record.

- id: sip_proxy_port
  label: SIP Proxy Port
  type: integer
  description: Value 0 obtains port from the DNS service record.

- id: sip_local_port
  label: SIP Local Port
  type: integer
  description: Value 0 selects port 5060.

- id: lift1_profile_number
  label: LIFT1 Profile Number
  type: integer
  range: 1-19

- id: lift1_intercom_identification_number
  label: LIFT1 Intercom Identification Number
  type: integer
  description: Numerical lift identification number; exact allowed range is unresolved.
```

## Events
```yaml
- id: power_event
  command: "EG EVT power=[charge|backup|fully|error]"

- id: startup_event
  command: "EG EVT start"

- id: sim_slot_event
  command: "EG EVT slot=[1|2]"

- id: input_event
  command: "EG EVT input=[0|1] missed=<num>"
```

## Macros
```yaml
# UNRESOLVED: no explicitly documented multi-step control macro found in source
```

## Safety
```yaml
confirmation_required_for:
  - "EG DEF <pwd>"
  - "L1 DEF <pwd>"
  - "EG SET <pwd> 165=1"
interlocks:
  - "External batteries require internal batteries to be removed before connection."
  - "Factory reset requires a long RESET press of 20 s when performed through hardware."
```

## Notes
Configuration changes require saving or restarting before taking effect. Invalid values cannot be saved. SMS commands require uppercase letters, one command type per message, and space-separated parameters. SMS length is limited to 140–160 characters.

Web access requires login. After three unsuccessful login attempts, the account is blocked for one minute. First login requires changing the default password; new passwords require at least eight characters, one lowercase letter, one uppercase letter, and one digit.

LIFT1 SMS programming supports Strong, Weak, or No pre-authorization. Disabling the LIFT1 SMS service prevents replies to received SMS requests. LIFT1 programming communicates with the attached communicator through CPC.

SIP supports RFC 3261 over UDP, SIPs, SRTP, and TLS. When SIP Server Port or Proxy Port is zero, the port is resolved from DNS service records. A zero Local Port selects 5060.

<!-- UNRESOLVED: TCP server port for Modem over TCP and RS-232 via TCP not stated. -->
<!-- UNRESOLVED: RS-232 baud-rate values and complete serial framing configuration not stated. -->
<!-- UNRESOLVED: Native TCP payload syntax for modem and RS-232-over-TCP services not stated. -->
<!-- UNRESOLVED: Firmware compatibility range not stated. -->
<!-- UNRESOLVED: HTTP base URL and request API not stated. -->

## Provenance

```yaml
source_domains:
  - 2n.com
source_urls:
  - https://www.2n.com/en-GB/download-manual/102462-1_6_0
retrieved_at: 2026-07-24T19:35:09.818Z
last_checked_at: 2026-08-05T07:16:53.772Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-08-05T07:16:53.772Z
matched_actions: 59
action_count: 59
confidence: medium
summary: "All 59 spec actions match documented L1/EG SMS commands and parameter assignments; transport port 8080 confirmed. (12 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "No native TCP control command protocol or fixed TCP port for Modem over TCP or RS-232 via TCP is stated."
- "HTTP base URL not stated; web interface uses device IP address and port 8080"
- "baud rate is configurable but supported values are not stated"
- "data bits not stated in source"
- "parity not stated in source"
- "stop bits not stated in source"
- "no explicitly documented multi-step control macro found in source"
- "TCP server port for Modem over TCP and RS-232 via TCP not stated."
- "RS-232 baud-rate values and complete serial framing configuration not stated."
- "Native TCP payload syntax for modem and RS-232-over-TCP services not stated."
- "Firmware compatibility range not stated."
- "HTTP base URL and request API not stated."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
