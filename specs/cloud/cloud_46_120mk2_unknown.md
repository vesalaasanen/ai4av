---
spec_id: admin/cloud-46-120mk2
schema_version: ai4av-public-spec-v1
revision: 1
title: "Cloud 46/120 Mixer-Amplifier Control Spec (CDI-46)"
manufacturer: Cloud
model_family: "Cloud 46/120 mixer-amplifier (46-120MK2) via CDI-46 serial control card"
aliases: []
compatible_with:
  manufacturers:
    - Cloud
  models:
    - "Cloud 46/120 mixer-amplifier (46-120MK2) via CDI-46 serial control card"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - cloud.co.uk
source_urls:
  - "https://www.cloud.co.uk/uploads/2022/01/CDI-46 Control Protocol V1.2.pdf"
  - https://www.cloud.co.uk/uploads/2025/04/46-120mk2-46-240_manual_en_v1.2-1.pdf
  - https://www.cloud.co.uk/uploads/2022/01/5ddbebf156ced526e8366bbe586b8501.pdf
  - https://www.cloud.co.uk
retrieved_at: 2026-07-25T20:02:16.136Z
last_checked_at: 2026-10-07T13:16:23.126Z
generated_at: 2026-10-07T13:16:23.126Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "default RS-232 baud rate not explicitly stated (available rates listed). Serial framing (data/parity/stop bits) not stated. Firmware/hardware version compatibility not stated. Web interface auth credentials not stated."
  - "factory default baud rate not stated in source"
  - "data bits not stated in source"
  - "parity not stated in source"
  - "stop bits not stated in source"
  - "flow control not stated in source"
  - "factory-default RS-232 baud rate not stated (only the set of valid rates)."
  - "serial framing (data bits / parity / stop bits / flow control) not stated."
  - "firmware and hardware version compatibility ranges not stated."
  - "web interface default password not stated (only the boot-loader/protocol password default of 1234)."
  - "Ethernet transport details beyond default port 4999 (TLS, keepalive, line ending) not stated."
verification:
  verdict: verified
  checked_at: 2026-10-07T13:16:23.126Z
  matched_actions: 59
  action_count: 59
  confidence: medium
  summary: "All 59 action units match source commands with correct shapes; port 4999 and baud rates supported; undocumented serial/auth fields honestly UNRESOLVED. (11 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-07-25
---

# Cloud 46/120 Mixer-Amplifier Control Spec (CDI-46)

## Summary
Cloud 46/120 mixer-amplifier (model 46-120MK2) controlled via the CDI-46 serial control card. The CDI-46 protocol is a text message protocol carried over RS-232 or over Ethernet (TCP, default port 4999). Messages set/clear mute, source select, level, microphone paging, zone defaults, parent-amplifier power state, and system parameters (baud, text field, boot loader, reset).

<!-- UNRESOLVED: default RS-232 baud rate not explicitly stated (available rates listed). Serial framing (data/parity/stop bits) not stated. Firmware/hardware version compatibility not stated. Web interface auth credentials not stated. -->

## Transport
```yaml
protocols:
  - tcp
  - serial
# Source: "This protocol may be used for sending commands to the RS232 interface
# or to the Ethernet interface on the port dedicated to the CDI-46 (default 4999)."
addressing:
  port: 4999  # default Ethernet port dedicated to the CDI-46
serial:
  baud_rate: null  # UNRESOLVED: factory default baud rate not stated in source
  # Available baud rates (settable via <SY.RS,B{rate}/>): 4800, 9600, 19200, 38400, 57600, 115200
  data_bits: null  # UNRESOLVED: data bits not stated in source
  parity: null  # UNRESOLVED: parity not stated in source
  stop_bits: null  # UNRESOLVED: stop bits not stated in source
  flow_control: null  # UNRESOLVED: flow control not stated in source
auth:
  type: UNRESOLVED  # source does not state this (was inferred none: no connection-level login procedure in source.)
  # NOTE: a 4-digit numeric password exists for boot loader unlock (<SY,BU{pin}/>)
  # and password change (<SY,K{old}{new}/>), default "1234" after reset.
  # The web management interface is separately password protected (out of scope).
```

## Traits
```yaml
traits:
  - powerable  # inferred: parent amplifier power up/down commands (<SY.PA,PU/PD/>)
  - routable   # inferred: source select + microphone paging across zones
  - queryable  # inferred: query modifiers (Q, SQ, LQ, PQ, MQ, *V,Q)
  - levelable  # inferred: music level commands (L/LU/LD) in dB steps
```

## Actions
```yaml
# Message envelope: header "<", destination+command, terminator "/>". Control
# messages are UPPER CASE; responses are lower case. Destinations:
#   Zones:        Z1, Z2, Z3, Z4 (each with sub-destination .MU music, .M1/.M2/.MI mic)
#   Global music: MU
#   Microphones:  MI (both), M1, M2
#   System:       SY (sub: .RS, .TX, .HV, .SV, .PV, .PA)
#   External:     EX
# "D" prefix on a destination sets the stored default value.

# --- Mute / Open (music + microphone destinations) ---
- id: mute
  label: Mute
  kind: action
  command: "<{dst},M/>"
  params:
    - name: dst
      type: string
      description: "Destination token, e.g. Z1.MU, Z1.M1, Z1.MI, MI, M1, M2, MU"

- id: open
  label: Open (unmute)
  kind: action
  command: "<{dst},O/>"
  params:
    - name: dst
      type: string
      description: "Destination token, e.g. Z1.MU, Z1.M1, Z1.MI, MI, M1, M2, MU"

- id: general_query
  label: General Query
  kind: query
  command: "<{dst},Q/>"
  params:
    - name: dst
      type: string
      description: "Destination token (music or microphone). Returns mute/source-enable/level-enable set."

# --- Music source (destination: {zone}.MU or MU) ---
- id: source_up
  label: Source Up
  kind: action
  command: "<{dst},SU/>"
  params:
    - name: dst
      type: string
      description: "{zone}.MU (zone) or MU (global music)"

- id: source_down
  label: Source Down
  kind: action
  command: "<{dst},SD/>"
  params:
    - name: dst
      type: string
      description: "{zone}.MU (zone) or MU (global music)"

- id: source_set
  label: Source Select (absolute)
  kind: action
  command: "<{dst},S{n}/>"
  params:
    - name: dst
      type: string
      description: "{zone}.MU (zone) or MU (global music)"
    - name: n
      type: integer
      description: "Line input 1-6, or 0 for none"

- id: source_enable
  label: Source Enable
  kind: action
  command: "<{dst},SE/>"
  params:
    - name: dst
      type: string
      description: "{zone}.MU (zone) or MU (global music)"

- id: source_disable
  label: Source Disable
  kind: action
  command: "<{dst},SX/>"
  params:
    - name: dst
      type: string
      description: "{zone}.MU (zone) or MU (global music)"

- id: source_query
  label: Source Query
  kind: query
  command: "<{dst},SQ/>"
  params:
    - name: dst
      type: string
      description: "{zone}.MU (zone) or MU (global music)"

# --- Music level (destination: {zone}.MU or MU) ---
- id: level_up
  label: Level Up
  kind: action
  command: "<{dst},LU{step}/>"
  params:
    - name: dst
      type: string
      description: "{zone}.MU (zone) or MU (global music)"
    - name: step
      type: integer
      description: "dB increase (e.g. 10 = +10dB)"

- id: level_down
  label: Level Down
  kind: action
  command: "<{dst},LD{step}/>"
  params:
    - name: dst
      type: string
      description: "{zone}.MU (zone) or MU (global music)"
    - name: step
      type: integer
      description: "dB decrease (e.g. 10 = -10dB)"

- id: level_set
  label: Level Set (absolute)
  kind: action
  command: "<{dst},L{value}/>"
  params:
    - name: dst
      type: string
      description: "{zone}.MU (zone) or MU (global music)"
    - name: value
      type: integer
      description: "Attenuation 0-90 dB (value of 20 = -20dB)"

- id: level_enable
  label: Level Enable
  kind: action
  command: "<{dst},LE/>"
  params:
    - name: dst
      type: string
      description: "{zone}.MU (zone) or MU (global music)"

- id: level_disable
  label: Level Disable
  kind: action
  command: "<{dst},LX/>"
  params:
    - name: dst
      type: string
      description: "{zone}.MU (zone) or MU (global music)"

- id: level_query
  label: Level Query
  kind: query
  command: "<{dst},LQ/>"
  params:
    - name: dst
      type: string
      description: "{zone}.MU (zone) or MU (global music)"

# --- Microphone 1 paging (destination M1 only) ---
- id: page_access
  label: Page Access
  kind: action
  command: "<M1,PA{value}/>"
  params:
    - name: value
      type: string
      description: "1-4 char list; X=routed to zone, O=un-routed. Position = zone (1..4). Truncatable."

- id: page_release
  label: Page Release
  kind: action
  command: "<M1,PR/>"
  params: []

- id: page_query
  label: Page Query
  kind: query
  command: "<M1,PQ/>"
  params: []

# --- Default-value commands (D prefix on destination) ---
- id: default_level_set
  label: Default Level Set
  kind: action
  command: "<D{dst},L{value}/>"
  params:
    - name: dst
      type: string
      description: "Z1..Z4.MU, MU"
    - name: value
      type: integer
      description: "Attenuation 0-90 dB"

- id: default_source_set
  label: Default Source Set
  kind: action
  command: "<D{dst},S{n}/>"
  params:
    - name: dst
      type: string
      description: "Z1..Z4.MU, MU"
    - name: n
      type: integer
      description: "Line input 1-6, or 0"

- id: default_mute
  label: Default Mute
  kind: action
  command: "<D{dst},M/>"
  params:
    - name: dst
      type: string
      description: "Z1..Z4.MU, Z1..Z4.M1/M2/MI, MI, M1, M2, MU"

- id: default_open
  label: Default Open
  kind: action
  command: "<D{dst},O/>"
  params:
    - name: dst
      type: string
      description: "Z1..Z4.MU, Z1..Z4.M1/M2/MI, MI, M1, M2, MU"

- id: default_level_enable
  label: Default Level Enable
  kind: action
  command: "<D{dst},LE/>"
  params:
    - name: dst
      type: string
      description: "Z1..Z4.MU, MU"

- id: default_source_enable
  label: Default Source Enable
  kind: action
  command: "<D{dst},SE/>"
  params:
    - name: dst
      type: string
      description: "Z1..Z4.MU, MU"

- id: default_level_disable
  label: Default Level Disable
  kind: action
  command: "<D{dst},LX/>"
  params:
    - name: dst
      type: string
      description: "Z1..Z4.MU, MU"

- id: default_source_disable
  label: Default Source Disable
  kind: action
  command: "<D{dst},SX/>"
  params:
    - name: dst
      type: string
      description: "Z1..Z4.MU, MU"

# --- External ---
- id: spot_announcer_trigger
  label: Spot Announcer Trigger
  kind: action
  command: "<EX,SA{n}/>"
  params:
    - name: n
      type: integer
      description: "PMSA message group number (e.g. 2)"

# --- System ---
- id: system_reset
  label: System Reset
  kind: action
  command: "<SY,R/>"
  params: []

- id: init_mode_default
  label: Init Mode Default
  kind: action
  command: "<SY,ID/>"
  params: []

- id: init_mode_previous
  label: Init Mode Previous
  kind: action
  command: "<SY,IP/>"
  params: []

- id: init_mode_factory
  label: Init Mode Factory
  kind: action
  command: "<SY,IF/>"
  params: []

- id: rs232_baud_set
  label: RS232 Baud Set
  kind: action
  command: "<SY.RS,B{rate}/>"
  params:
    - name: rate
      type: integer
      description: "One of 4800, 9600, 19200, 38400, 57600, 115200"

- id: password_set
  label: Password Set
  kind: action
  command: "<SY,K{oldnew}/>"
  params:
    - name: oldnew
      type: string
      description: "Exactly 8 numeric chars: first 4 = old password, last 4 = new password"

- id: ping
  label: Ping
  kind: action
  command: "<SY,?/>"
  params: []

- id: system_music_mute_socket_query
  label: System Music Mute Socket Query
  kind: query
  command: "<SY,MQ/>"
  params: []

- id: software_version_query
  label: Software Version Query
  kind: query
  command: "<SY.SV,Q/>"
  params: []

- id: hardware_version_query
  label: Hardware Version Query (CDI-46)
  kind: query
  command: "<SY.HV,Q/>"
  params: []

- id: parent_version_query
  label: Parent Amplifier Version Query
  kind: query
  command: "<SY.PV,Q/>"
  params: []

- id: parent_amp_power_down
  label: Parent Amplifier Power Down
  kind: action
  command: "<SY.PA,PD/>"
  params: []

- id: parent_amp_power_up
  label: Parent Amplifier Power Up
  kind: action
  command: "<SY.PA,PU/>"
  params: []

- id: parent_amp_power_query
  label: Parent Amplifier Power Query
  kind: query
  command: "<SY.PA,Q/>"
  params: []

- id: text_field_set
  label: Text Field Set
  kind: action
  command: "<SY.TX,S={text}/>"
  params:
    - name: text
      type: string
      description: "Up to 32 ASCII characters"

- id: text_field_query
  label: Text Field Query
  kind: query
  command: "<SY.TX,Q/>"
  params: []

- id: bootload_unlock
  label: Boot Load Unlock
  kind: action
  command: "<SY,BU{pin}/>"
  params:
    - name: pin
      type: string
      description: "4-digit numeric password (default 1234 after reset)"

- id: bootload_enable
  label: Boot Load Enable
  kind: action
  command: "<SY,BE/>"
  params: []

- id: bootload_disable
  label: Boot Load Disable
  kind: action
  command: "<SY,BD/>"
  params: []

- id: bootload_reset
  label: Boot Load Reset
  kind: action
  command: "<SY,BR/>"
  params: []

- id: bootload_lock
  label: Boot Load Lock
  kind: action
  command: "<SY,BL/>"
  params: []

- id: bootload_query
  label: Boot Load Query
  kind: query
  command: "<SY,BQ/>"
  params: []
```

## Feedbacks
```yaml
# All responses are lower-case echoes of the sent message. Level/source commands
# return the new absolute value; global-music responses return a semicolon-
# separated list of per-zone values.
- id: power_state
  type: enum
  values: [pu, pd]  # response to <SY.PA,Q/>: "q = pu" or "q = pd"
  query_command: "<SY.PA,Q/>"

- id: music_mute_state
  type: enum
  values: [m, o]  # mute / open
  query_command: "<Z1.MU,Q/>"

- id: microphone_mute_state
  type: enum
  values: [m, o]
  query_command: "<MI,Q/>"

- id: music_level
  type: integer
  # absolute attenuation 0-90 dB
  query_command: "<Z1.MU,LQ/>"

- id: music_source
  type: integer
  # 0-6
  query_command: "<Z1.MU,SQ/>"

- id: text_field
  type: string
  query_command: "<SY.TX,Q/>"

- id: cdi_hardware_version
  type: string
  query_command: "<SY.HV,Q/>"

- id: cdi_software_version
  type: string
  query_command: "<SY.SV,Q/>"

- id: parent_hardware_version
  type: string
  query_command: "<SY.PV,Q/>"

- id: bootload_state
  type: string
  # response form: "<sy,bq = {lock}{enabled}/> e.g. ld (locked+disabled), ue (unlocked+enabled)"
  query_command: "<SY,BQ/>"

- id: error
  type: enum
  values: [B, E, I, N, A, P, T]
  # Buffer full, Execution, Interrupted, NVM-not-ready, Overrun, Parse, Token
```

## Variables
```yaml
# Settable parameters already exposed as actions (level, source, baud rate,
# password, text field, init mode, defaults). No additional non-action
# variables identified in source.
```

## Events
```yaml
# No unsolicited notifications documented. All responses are solicited replies
# to control messages.
```

## Macros
```yaml
# No multi-step sequences explicitly described in source.
```

## Safety
```yaml
confirmation_required_for:
  - system_reset  # <SY,R/> resets ALL parameters to factory defaults
  - parent_amp_power_down  # mutes all amplifier outputs (standby)
  - bootload_reset  # forces CDI-46 into boot loader at next power-on/reset
  - rs232_baud_set  # changes baud after the response is sent; can break the active session
interlocks:
  - "Boot loader enable/disable/reset only available when unlocked (<SY,BU{pin}/>); reset requires unlocked AND enabled."
  - "Password change (<SY,K{old}{new}/>) requires the correct current 4-digit password as the first 4 chars."
# Source text: "As a safety feature enabling or disabling is only available when
# unlocked, reset is only available when unlocked and enabled. As an extra
# safeguard the unlock modifier requires the four digit numeric password as a
# value."
```

## Notes
- Message envelope is `<DESTINATION,COMMAND/>`. A new `<` header aborts any in-progress message (returns an Interrupted error). Receive buffer is 64 characters; overflow yields a Buffer Full error (`<!B Message Buffer Full/>`) and all chars are ignored until the next `<`.
- Control messages use UPPER CASE; response and error replies use lower case. Errors take the form `<!{ID} [returned] text/>` with ID in `{B,E,I,N,A,P,T}`.
- Global music (`MU`) responses for level/source return a semicolon-separated list of the four zone values (zone1;zone2;zone3;zone4).
- Default-value commands use the `D` prefix on the destination token; the last default sent may override earlier ones (per-zone overrides global and vice-versa).
- The CDI-46 ships with DHCP enabled; the web management interface (password protected) is used to set RS-232 baud and network settings.
- Boot loader password defaults to `1234` after a system reset.

<!-- UNRESOLVED: factory-default RS-232 baud rate not stated (only the set of valid rates). -->
<!-- UNRESOLVED: serial framing (data bits / parity / stop bits / flow control) not stated. -->
<!-- UNRESOLVED: firmware and hardware version compatibility ranges not stated. -->
<!-- UNRESOLVED: web interface default password not stated (only the boot-loader/protocol password default of 1234). -->
<!-- UNRESOLVED: Ethernet transport details beyond default port 4999 (TLS, keepalive, line ending) not stated. -->
```

## Provenance

```yaml
source_domains:
  - cloud.co.uk
source_urls:
  - "https://www.cloud.co.uk/uploads/2022/01/CDI-46 Control Protocol V1.2.pdf"
  - https://www.cloud.co.uk/uploads/2025/04/46-120mk2-46-240_manual_en_v1.2-1.pdf
  - https://www.cloud.co.uk/uploads/2022/01/5ddbebf156ced526e8366bbe586b8501.pdf
  - https://www.cloud.co.uk
retrieved_at: 2026-07-25T20:02:16.136Z
last_checked_at: 2026-10-07T13:16:23.126Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-10-07T13:16:23.126Z
matched_actions: 59
action_count: 59
confidence: medium
summary: "All 59 action units match source commands with correct shapes; port 4999 and baud rates supported; undocumented serial/auth fields honestly UNRESOLVED. (11 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "default RS-232 baud rate not explicitly stated (available rates listed). Serial framing (data/parity/stop bits) not stated. Firmware/hardware version compatibility not stated. Web interface auth credentials not stated."
- "factory default baud rate not stated in source"
- "data bits not stated in source"
- "parity not stated in source"
- "stop bits not stated in source"
- "flow control not stated in source"
- "factory-default RS-232 baud rate not stated (only the set of valid rates)."
- "serial framing (data bits / parity / stop bits / flow control) not stated."
- "firmware and hardware version compatibility ranges not stated."
- "web interface default password not stated (only the boot-loader/protocol password default of 1234)."
- "Ethernet transport details beyond default port 4999 (TLS, keepalive, line ending) not stated."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
