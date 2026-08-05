---
spec_id: admin/visual-productions-iocore2
schema_version: ai4av-public-spec-v1
revision: 1
title: "Visual Productions IoCore2 Control Spec"
manufacturer: "Visual Productions"
model_family: IoCore2
aliases: []
compatible_with:
  manufacturers:
    - "Visual Productions"
  models:
    - IoCore2
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - api.visualproductions.nl
source_urls:
  - https://api.visualproductions.nl/api/download/6763ec7f5aaf91d36674c9e4
retrieved_at: 2026-04-30T02:45:43.018Z
last_checked_at: 2026-07-22T08:03:52.542Z
generated_at: 2026-07-22T08:03:52.542Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "serial baud rate, data bits, parity, stop bits not stated in source"
  - "OSC listening port (Section 9.9 references a 'Port' field but states no default value)"
  - "baud rate not stated in source (Section 9.3 confirms settings exist but gives no values)"
  - "not stated in source"
  - "not stated in source (Section 9.3 mentions stopbits exist)"
  - "power on/off not documented, blink task present"
  - "DMX/Art-Net/sACN routing commands present"
  - "DMX channel control present"
  - "no unsolicited event emission documented in source beyond D.3 client feedback"
  - "no explicit multi-step macros in source"
  - "no safety warnings or interlock procedures in source"
  - "RS-232 serial configuration (baud rate, data bits, parity, stop bits) not stated in source"
  - "OSC listening port default value not stated in source"
  - "firmware version compatibility not stated in source"
  - "power on/off commands not documented"
  - "unsolicited event emission not documented beyond D.3 client feedback"
verification:
  verdict: verified
  checked_at: 2026-07-22T08:03:52.542Z
  matched_actions: 101
  action_count: 101
  confidence: medium
  summary: "All 101 spec actions matched exactly against 86 task types (Appendix B) plus 15 API endpoints (Appendix D); transport parameters verified; full bidirectional coverage. (16 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-04-27
---

# Visual Productions IoCore2 Control Spec

## Summary
The IoCore2 is a multi-protocol control gateway with 8 GPI inputs, 8 GPO relay outputs, RS-232, DMX512, Art-Net, sACN, TCP, UDP, and OSC. Control is achieved through task programming via Show Control page; the API (OSC/UDP/TCP) exposes internal functions. No authentication required for any protocol.

<!-- UNRESOLVED: serial baud rate, data bits, parity, stop bits not stated in source -->

## Transport
```yaml
protocols:
  - serial
  - tcp
  - udp
  - osc
addressing:
  port: 7000  # TCP/UDP default (Section 9.10: "By default both ports are set to 7000")
  # UNRESOLVED: OSC listening port (Section 9.9 references a 'Port' field but states no default value)
serial:
  baud_rate: null  # UNRESOLVED: baud rate not stated in source (Section 9.3 confirms settings exist but gives no values)
  data_bits: null  # UNRESOLVED: not stated in source
  parity: null  # UNRESOLVED: not stated in source
  stop_bits: null  # UNRESOLVED: not stated in source (Section 9.3 mentions stopbits exist)
  flow_control: null  # UNRESOLVED: not stated in source
auth:
  type: none  # inferred: no auth/login procedure in source
```

## Traits
```yaml
- powerable  # UNRESOLVED: power on/off not documented, blink task present
- routable  # UNRESOLVED: DMX/Art-Net/sACN routing commands present
- queryable  # inferred: /core/hello echo, GPI feedback, variable read
- levelable  # UNRESOLVED: DMX channel control present
```

## Actions
```yaml
# Action Tasks (Appendix B.1)
- id: action_link_set
  label: Action Link Set
  kind: action
  params:
    - name: action
      type: string
      description: Action to trigger via Link feature

# GPO Tasks (Appendix B.5)
- id: gpo_set
  label: GPO Set Value
  kind: action
  params:
    - name: port
      type: integer
      description: Port number [1,8]
    - name: value
      type: string
      description: On or Off
- id: gpo_toggle
  label: GPO Toggle
  kind: action
  params:
    - name: port
      type: integer
      description: Port number [1,8]
- id: gpo_control
  label: GPO Control
  kind: action
  params:
    - name: port
      type: integer
      description: Port number [1,8]
- id: gpo_pulse
  label: GPO Pulse
  kind: action
  params:
    - name: port
      type: integer
      description: Port number [1,8]
- id: gpo_solo
  label: GPO Solo Set
  kind: action
  params:
    - name: port
      type: integer
      description: Port number [1,8]
- id: gpo_solo_control
  label: GPO Solo Control
  kind: action
  params:
    - name: port
      type: integer
      description: Port number [1,8]
- id: gpo_random_solo
  label: GPO Random Solo
  kind: action
  params: []
- id: gpo_clear_all
  label: GPO Clear All
  kind: action
  params: []

# GPI Tasks (Appendix B.4)
- id: gpi_refresh
  label: GPI Refresh
  kind: action
  params: []
  notes: Force the GPI actions to be triggered

# DMX Tasks (Appendix B.3)
- id: dmx_universe_control_htp
  label: DMX Universe HTP Control
  kind: action
  params:
    - name: universe
      type: integer
      description: Universe number
- id: dmx_universe_control_ltp
  label: DMX Universe LTP Control
  kind: action
  params:
    - name: universe
      type: integer
      description: Universe number
- id: dmx_universe_control_priority
  label: DMX Universe Control Priority
  kind: action
  params:
    - name: universe
      type: integer
      description: Universe number
- id: dmx_universe_clear
  label: DMX Universe Clear
  kind: action
  params:
    - name: universe
      type: integer
      description: Universe number
- id: dmx_channel_set
  label: DMX Channel Set
  kind: action
  params:
    - name: channel
      type: integer
      description: DMX channel [1,512]
    - name: value
      type: integer
      description: DMX value
- id: dmx_channel_toggle
  label: DMX Channel Toggle
  kind: action
  params:
    - name: channel
      type: integer
      description: DMX channel [1,512]
- id: dmx_channel_control
  label: DMX Channel Control
  kind: action
  params:
    - name: channel
      type: integer
      description: DMX channel [1,512]
- id: dmx_channel_inverted_control
  label: DMX Channel Inverted Control
  kind: action
  params:
    - name: channel
      type: integer
      description: DMX channel [1,512]
- id: dmx_channel_decrement
  label: DMX Channel Decrement
  kind: action
  params:
    - name: channel
      type: integer
      description: DMX channel [1,512]
- id: dmx_channel_increment
  label: DMX Channel Increment
  kind: action
  params:
    - name: channel
      type: integer
      description: DMX channel [1,512]
- id: dmx_bump_set
  label: DMX Bump Set
  kind: action
  params:
    - name: channel
      type: integer
      description: DMX channel [1,512]
    - name: value
      type: integer
      description: DMX value
- id: dmx_bump_control
  label: DMX Bump Control
  kind: action
  params:
    - name: channel
      type: integer
      description: DMX channel [1,512]
- id: dmx_rgb_set
  label: DMX RGB Set
  kind: action
  params:
    - name: address
      type: integer
      description: DMX address
    - name: colour
      type: string
      description: RGB colour value
- id: dmx_rgb_control
  label: DMX RGB Control
  kind: action
  params:
    - name: address
      type: integer
      description: DMX address
- id: dmx_rgba_control
  label: DMX RGBA Control
  kind: action
  params:
    - name: address
      type: integer
      description: DMX address
- id: dmx_xy_control
  label: DMX XY Control
  kind: action
  params:
    - name: address
      type: integer
      description: DMX address
- id: dmx_xxyy_control
  label: DMX XxYy Control
  kind: action
  params:
    - name: address
      type: integer
      description: DMX address
- id: dmx_clear_all
  label: DMX Clear All
  kind: action
  params: []

# Timer Tasks (Appendix B.10)
- id: timer_start
  label: Timer Start
  kind: action
  params:
    - name: timer
      type: integer
      description: Timer number [1,4]
- id: timer_stop
  label: Timer Stop
  kind: action
  params:
    - name: timer
      type: integer
      description: Timer number [1,4]
- id: timer_restart
  label: Timer Restart
  kind: action
  params:
    - name: timer
      type: integer
      description: Timer number [1,4]
- id: timer_set
  label: Timer Set
  kind: action
  params:
    - name: timer
      type: integer
      description: Timer number [1,4]
    - name: time
      type: string
      description: Time string

# Variable Tasks (Appendix B.12)
- id: variable_set
  label: Variable Set Value
  kind: action
  params:
    - name: variable
      type: integer
      description: Variable number [1,8]
    - name: value
      type: integer
      description: Value [0,255]
- id: variable_toggle
  label: Variable Toggle
  kind: action
  params:
    - name: variable
      type: integer
      description: Variable number [1,8]
    - name: value
      type: integer
      description: Value [0,255]
- id: variable_control
  label: Variable Control
  kind: action
  params:
    - name: variable
      type: integer
      description: Variable number [1,8]
- id: variable_inverted_control
  label: Variable Inverted Control
  kind: action
  params:
    - name: variable
      type: integer
      description: Variable number [1,8]
- id: variable_decrement
  label: Variable Decrement
  kind: action
  params:
    - name: variable
      type: integer
      description: Variable number [1,8]
- id: variable_increment
  label: Variable Increment
  kind: action
  params:
    - name: variable
      type: integer
      description: Variable number [1,8]
- id: variable_continuous_decrement
  label: Variable Continuous Decrement
  kind: action
  params:
    - name: variable
      type: integer
      description: Variable number [1,8]
    - name: delta
      type: integer
      description: Delta [1,255]
- id: variable_continuous_increment
  label: Variable Continuous Increment
  kind: action
  params:
    - name: variable
      type: integer
      description: Variable number [1,8]
    - name: delta
      type: integer
      description: Delta [1,255]
- id: variable_stop_continuous
  label: Variable Stop Continuous
  kind: action
  params:
    - name: variable
      type: integer
      description: Variable number [1,8]
- id: variable_control_scaled
  label: Variable Control Scaled
  kind: action
  params:
    - name: variable
      type: integer
      description: Variable number [1,8]
    - name: percentage
      type: integer
      description: Percentage [0%,100%]
- id: variable_control_offset
  label: Variable Control Offset
  kind: action
  params:
    - name: variable
      type: integer
      description: Variable number [1,8]
    - name: offset
      type: integer
      description: Offset [0,255]
- id: variable_refresh
  label: Variable Refresh
  kind: action
  params:
    - name: variable
      type: integer
      description: Variable number [1,8]
- id: variable_single_dimmer
  label: Variable Single Dimmer
  kind: action
  params:
    - name: variable
      type: integer
      description: Variable number
    - name: delta
      type: integer
      description: Delta

# OSC Send Tasks (Appendix B.6)
- id: osc_send_float_set
  label: OSC Send Float Set
  kind: action
  params:
    - name: uri
      type: string
      description: OSC URI (max 25 chars, leading '/' required)
    - name: value
      type: number
      description: Floating point number
- id: osc_send_float_control
  label: OSC Send Float Control
  kind: action
  params:
    - name: uri
      type: string
      description: OSC URI (max 25 chars, leading '/' required)
- id: osc_send_unsigned_set
  label: OSC Send Unsigned Set
  kind: action
  params:
    - name: uri
      type: string
      description: OSC URI
    - name: value
      type: integer
      description: Positive number
- id: osc_send_unsigned_control
  label: OSC Send Unsigned Control
  kind: action
  params:
    - name: uri
      type: string
      description: OSC URI
- id: osc_send_bool_set
  label: OSC Send Bool Set
  kind: action
  params:
    - name: uri
      type: string
      description: OSC URI
    - name: value
      type: boolean
      description: True or false
- id: osc_send_bool_control
  label: OSC Send Bool Control
  kind: action
  params:
    - name: uri
      type: string
      description: OSC URI
- id: osc_send_string_set
  label: OSC Send String Set
  kind: action
  params:
    - name: uri
      type: string
      description: OSC URI
    - name: value
      type: string
      description: String of characters
- id: osc_send_string_control
  label: OSC Send String Control
  kind: action
  params:
    - name: uri
      type: string
      description: OSC URI
- id: osc_send_colour_set
  label: OSC Send Colour Set
  kind: action
  params:
    - name: uri
      type: string
      description: OSC URI
    - name: colour
      type: string
      description: RGB colour
- id: osc_send_colour_control
  label: OSC Send Colour Control
  kind: action
  params:
    - name: uri
      type: string
      description: OSC URI

# RS-232 Send Tasks (Appendix B.8)
- id: rs232_send_float_set
  label: RS-232 Send Float Set
  kind: action
  params:
    - name: value
      type: number
      description: Floating point number
- id: rs232_send_float_control
  label: RS-232 Send Float Control
  kind: action
  params: []
- id: rs232_send_unsigned_set
  label: RS-232 Send Unsigned Set
  kind: action
  params:
    - name: value
      type: integer
      description: Positive number
- id: rs232_send_unsigned_control
  label: RS-232 Send Unsigned Control
  kind: action
  params: []
- id: rs232_send_bool_set
  label: RS-232 Send Bool Set
  kind: action
  params:
    - name: value
      type: string
      description: On or Off
- id: rs232_send_bool_control
  label: RS-232 Send Bool Control
  kind: action
  params: []
- id: rs232_send_string
  label: RS-232 Send String
  kind: action
  params:
    - name: value
      type: string
      description: Text string (max 25 chars)
- id: rs232_send_string_control
  label: RS-232 Send String Control
  kind: action
  params: []
- id: rs232_send_hex
  label: RS-232 Send Hex
  kind: action
  params:
    - name: value
      type: string
      description: Hex string
- id: rs232_send_hex_control
  label: RS-232 Send Hex Control
  kind: action
  params:
    - name: value
      type: string
      description: Hex string
- id: rs232_send_bytes
  label: RS-232 Send Bytes
  kind: action
  params:
    - name: value
      type: string
      description: Hex string (e.g. '56697375616C0A' = 'Visual'+LF). No default termination; add manually if required.
- id: rs232_send_bytes_control
  label: RS-232 Send Bytes Control
  kind: action
  params: []

# UDP Send Tasks (Appendix B.11)
- id: udp_send_float_set
  label: UDP Send Float Set
  kind: action
  params:
    - name: value
      type: number
      description: Floating point number
    - name: ip_port
      type: string
      description: IP address and port (e.g., "192.168.1.11:7000")
- id: udp_send_float_control
  label: UDP Send Float Control
  kind: action
  params:
    - name: ip_port
      type: string
      description: IP address and port
- id: udp_send_unsigned_set
  label: UDP Send Unsigned Set
  kind: action
  params:
    - name: value
      type: integer
      description: Positive number
    - name: ip_port
      type: string
      description: IP address and port
- id: udp_send_unsigned_control
  label: UDP Send Unsigned Control
  kind: action
  params:
    - name: ip_port
      type: string
      description: IP address and port
- id: udp_send_bool_set
  label: UDP Send Bool Set
  kind: action
  params:
    - name: value
      type: boolean
      description: True or false
    - name: ip_port
      type: string
      description: IP address and port
- id: udp_send_bool_control
  label: UDP Send Bool Control
  kind: action
  params:
    - name: ip_port
      type: string
      description: IP address and port
- id: udp_send_string
  label: UDP Send String
  kind: action
  params:
    - name: value
      type: string
      description: Text string (max 25 chars)
    - name: ip_port
      type: string
      description: IP address and port (e.g., "192.168.1.11:7000")
- id: udp_send_string_control
  label: UDP Send String Control
  kind: action
  params:
    - name: ip_port
      type: string
      description: IP address and port
- id: udp_send_hex_set
  label: UDP Send Hex Set
  kind: action
  params:
    - name: value
      type: string
      description: Hex string
    - name: ip_port
      type: string
      description: IP address and port
- id: udp_send_hex
  label: UDP Send Hex Control
  kind: action
  params:
    - name: value
      type: string
      description: Hex string
    - name: ip_port
      type: string
      description: IP address and port
- id: udp_wake_on_lan
  label: UDP Wake On Lan
  kind: action
  params:
    - name: mac_address
      type: string
      description: MAC address of NIC
    - name: ip_port
      type: string
      description: IP address and port (recommended 255.255.255.255:7)

# System Tasks (Appendix B.9)
- id: system_blink
  label: System Blink Set
  kind: action
  params:
    - name: value
      type: string
      description: On or Off
- id: system_blink_toggle
  label: System Blink Toggle
  kind: action
  params: []
- id: system_blink_control
  label: System Blink Control
  kind: action
  params: []

# Actionlist Tasks (Appendix B.2)
- id: actionlist_enable
  label: Actionlist Enable
  kind: action
  params:
    - name: actionlist
      type: integer
      description: Action list number [1,8]
    - name: value
      type: boolean
      description: On or Off
- id: actionlist_toggle
  label: Actionlist Toggle
  kind: action
  params:
    - name: actionlist
      type: integer
      description: Action list number [1,8]
- id: actionlist_control
  label: Actionlist Control
  kind: action
  params:
    - name: actionlist
      type: integer
      description: Action list number [1,8]
- id: actionlist_inverted_control
  label: Actionlist Inverted Control
  kind: action
  params:
    - name: actionlist
      type: integer
      description: Action list number [1,8]

# Randomizer Tasks (Appendix B.7)
- id: randomizer_refresh
  label: Randomizer Refresh
  kind: action
  params:
    - name: min_value
      type: integer
    - name: max_value
      type: integer

# API Actions (Appendix D) - OSC paths and UDP/TCP command strings from source verbatim
- id: api_gpo_set
  label: API GPO Set
  kind: action
  command: "/core/gpo/{port}"  # OSC; UDP/TCP: core-gpo-{port}=<0/1>
  params:
    - name: port
      type: integer
      description: GPO port [1,6]
    - name: value
      type: integer
      description: 0 (off) or 1 (on)
- id: api_actionlist_execute
  label: API Actionlist Execute
  kind: action
  command: "/core/al/{list}/{action}/execute"  # OSC; UDP/TCP: core-al-{list}-{action}-execute=<arg>
  params:
    - name: actionlist
      type: integer
      description: Action list number [1,8]
    - name: action
      type: integer
      description: Action number [1,48]
- id: api_actionlist_enable
  label: API Actionlist Enable
  kind: action
  command: "/core/al/{list}/enable"  # OSC; UDP/TCP: core-al-{list}-enable=<bool>
  params:
    - name: actionlist
      type: integer
      description: Action list number [1,8]
    - name: value
      type: boolean
      description: Enable/disable
- id: api_dmx_set
  label: API DMX Set
  kind: action
  command: "/core/dmx/{channel}"  # OSC; UDP/TCP: core-dmx-{channel}=<integer>
  params:
    - name: channel
      type: integer
      description: DMX channel [1,512]
    - name: value
      type: integer
      description: DMX value
- id: api_timer_start
  label: API Timer Start
  kind: action
  command: "/core/tm/{timer}/start"  # OSC; UDP/TCP: core-tm-{timer}-start
  params:
    - name: timer
      type: integer
      description: Timer number [1,4]
- id: api_timer_stop
  label: API Timer Stop
  kind: action
  command: "/core/tm/{timer}/stop"  # OSC; UDP/TCP: core-tm-{timer}-stop
  params:
    - name: timer
      type: integer
      description: Timer number [1,4]
- id: api_timer_restart
  label: API Timer Restart
  kind: action
  command: "/core/tm/{timer}/restart"  # OSC; UDP/TCP: core-tm-{timer}-restart
  params:
    - name: timer
      type: integer
      description: Timer number [1,4]
- id: api_timer_pause
  label: API Timer Pause
  kind: action
  command: "/core/tm/{timer}/pause"  # OSC; UDP/TCP: core-tm-{timer}-pause
  params:
    - name: timer
      type: integer
      description: Timer number [1,4]
- id: api_timer_set
  label: API Timer Set
  kind: action
  command: "/core/tm/{timer}/set"  # OSC; UDP/TCP: core-tm-{timer}-set=<text>
  params:
    - name: timer
      type: integer
      description: Timer number [1,4]
    - name: time
      type: string
      description: Time string
- id: api_variable_set
  label: API Variable Set
  kind: action
  command: "/core/va/{variable}/set"  # OSC; UDP/TCP: core-va-{variable}-set=<integer>
  params:
    - name: variable
      type: integer
      description: Variable number [1,8]
    - name: value
      type: integer
      description: Value [0,255]
- id: api_variable_refresh
  label: API Variable Refresh
  kind: action
  command: "/core/va/{variable}/refresh"  # OSC; UDP/TCP: core-va-{variable}-refresh
  params:
    - name: variable
      type: integer
      description: Variable number [1,8]
- id: api_variable_refresh_all
  label: API Variable Refresh All
  kind: action
  command: "/core/va/refresh"  # OSC; UDP/TCP: core-va-refresh
  params: []
  notes: Refresh all variables; triggers generated as if each variable changed value
- id: api_blink
  label: API Blink
  kind: action
  command: "/core/blink"  # OSC; UDP/TCP: core-blink
  params: []
- id: api_hello
  label: API Hello
  kind: action
  command: "/core/hello"  # OSC; UDP/TCP: core-hello
  params: []
  notes: Unit replies with the same Hello message; ideal for polling/online check
- id: api_goodbye
  label: API Goodbye
  kind: action
  command: "/core/goodbye"  # OSC; UDP/TCP: core-goodbye
  params: []
  notes: Explicitly removes sender from the client feedback list
```

## Feedbacks
```yaml
# GPI feedback (Appendix D.3)
- id: gpi_pin_state
  type: enum
  values:
    - ON
    - OFF
    - "50%"
  description: GPI pin state feedback (OSC: /core/gpi/<pin>, UDP: core-gpi-<pin number>=ON/OFF/50%)

# Actionlist feedback (Appendix D.3)
- id: actionlist_enable_state
  type: boolean
  description: Actionlist enable state feedback (OSC: /core/al/<list>/enable, UDP: core-al-<list>-enable)

# API hello reply
- id: hello_reply
  type: string
  description: Echo reply to /core/hello (OSC) or core-hello (UDP/TCP)
```

## Variables
```yaml
# 8 internal variables (Appendix B.12, Appendix A.12)
# Range [0,255], controllable via API
- id: variable_1
  type: integer
  range: [0,255]
  description: Internal variable 1
- id: variable_2
  type: integer
  range: [0,255]
  description: Internal variable 2
- id: variable_3
  type: integer
  range: [0,255]
  description: Internal variable 3
- id: variable_4
  type: integer
  range: [0,255]
  description: Internal variable 4
- id: variable_5
  type: integer
  range: [0,255]
  description: Internal variable 5
- id: variable_6
  type: integer
  range: [0,255]
  description: Internal variable 6
- id: variable_7
  type: integer
  range: [0,255]
  description: Internal variable 7
- id: variable_8
  type: integer
  range: [0,255]
  description: Internal variable 8
```

## Events
```yaml
# UNRESOLVED: no unsolicited event emission documented in source beyond D.3 client feedback
# Triggers defined (Appendix A) are inputs, not outgoing events
```

## Macros
```yaml
# UNRESOLVED: no explicit multi-step macros in source
# Templates (Appendix C) provide preset configurations:
# - GPI->OSC Float/Bool, GPI->UDP Float/Bool
# - GPI->DMX, DMX->GPO, Art-Net->GPO, sACN->GPO
# - Receiving DMX/Art-Net/sACN
# - GPI->CueCore2, GPI->LPU-2
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: no safety warnings or interlock procedures in source
```

## Notes

**Protocol Support**: The IoCore2 is a protocol bridge supporting GPI/GPO (8 each), RS-232, DMX512, Art-Net, sACN, TCP, UDP, and OSC. All control is via task programming in Show Control page; there is no standalone command reference—all actions are defined within the task system.

**API Endpoints**: The device exposes internal functions via OSC (paths prefixed `/core/`) and UDP/TCP (strings prefixed `core-`). OSC uses path-based addressing; UDP/TCP use hyphen-separated command strings (e.g., `core-gpo-1=1`). Both APIs provide equivalent functionality for GPO control, actionlist execution, DMX channel control, timer operation, variable read/write, and system commands (`blink`, `hello`, `goodbye`).

**GPI/GPO**: GPI ports support digital (contact-closure) or analog (0-10V) modes. GPO ports are normally-open relays rated 50VAC/30VDC up to 3A. Binary trigger combinations use port values 1,2,4,8,16,32,64,128 summed. Note: GPO task range is [1,8] (Appendix B.5) while the API GPO range is [1,6] (Appendix D.1/D.2) — both values preserved verbatim from source.

**DMX**: Supports input or output mode. Slow DMX option reduces transmission rate. DMX data can be bridged to/from Art-Net or sACN (1 universe each).

**Art-Net/sACN**: Art-Net supports 1 universe in and 1 out (universe address `subnet.universe`, range 0.0–15.15). sACN supports 1 universe in and 1 out (universe range 1–63999, priority 0–200). Both can be disabled by setting output to `off`.

**TCP/UDP Port**: Default port 7000 for both TCP and UDP (Section 9.10: "By default both ports are set to 7000").

**OSC Port**: OSC listens on a configurable port (Section 9.9 'Port' field); source states no default value. Up to four outgoing OSC target IPs in `ip-address:port` format; broadcast IP supported.

**Feedback Loop Warning**: When two Visual Productions devices are connected via OSC/UDP, feedback messages can create loops. Prevention: assign unique label to device's API prefix (Section D.3.1).

**Authentication**: No authentication, password, or login procedure described in source for any protocol.

<!-- UNRESOLVED: RS-232 serial configuration (baud rate, data bits, parity, stop bits) not stated in source -->
<!-- UNRESOLVED: OSC listening port default value not stated in source -->
<!-- UNRESOLVED: firmware version compatibility not stated in source -->
<!-- UNRESOLVED: power on/off commands not documented -->
<!-- UNRESOLVED: unsolicited event emission not documented beyond D.3 client feedback -->

## Provenance

```yaml
source_domains:
  - api.visualproductions.nl
source_urls:
  - https://api.visualproductions.nl/api/download/6763ec7f5aaf91d36674c9e4
retrieved_at: 2026-04-30T02:45:43.018Z
last_checked_at: 2026-07-22T08:03:52.542Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-07-22T08:03:52.542Z
matched_actions: 101
action_count: 101
confidence: medium
summary: "All 101 spec actions matched exactly against 86 task types (Appendix B) plus 15 API endpoints (Appendix D); transport parameters verified; full bidirectional coverage. (16 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "serial baud rate, data bits, parity, stop bits not stated in source"
- "OSC listening port (Section 9.9 references a 'Port' field but states no default value)"
- "baud rate not stated in source (Section 9.3 confirms settings exist but gives no values)"
- "not stated in source"
- "not stated in source (Section 9.3 mentions stopbits exist)"
- "power on/off not documented, blink task present"
- "DMX/Art-Net/sACN routing commands present"
- "DMX channel control present"
- "no unsolicited event emission documented in source beyond D.3 client feedback"
- "no explicit multi-step macros in source"
- "no safety warnings or interlock procedures in source"
- "RS-232 serial configuration (baud rate, data bits, parity, stop bits) not stated in source"
- "OSC listening port default value not stated in source"
- "firmware version compatibility not stated in source"
- "power on/off commands not documented"
- "unsolicited event emission not documented beyond D.3 client feedback"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
