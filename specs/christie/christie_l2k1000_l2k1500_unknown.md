---
spec_id: admin/christie-l2k1000-l2k1500
schema_version: ai4av-public-spec-v1
revision: 1
title: "Christie L2K1000/L2K1500 Control Spec"
manufacturer: Christie
model_family: L2K1000
aliases: []
compatible_with:
  manufacturers:
    - Christie
  models:
    - L2K1000
    - L2K1500
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - christiedigital.com
  - projector-database.com
source_urls:
  - https://www.christiedigital.com/globalassets/resources/public/020-000395-01-christie-l2k1000-user-manual-net.pdf
  - https://www.christiedigital.com/globalassets/resources/public/020-000393-01-christie-l2k1000-user-manual.pdf
  - https://www.christiedigital.com/globalassets/resources/public/020-000409-01-christie-l2k1000-setup-guide.pdf
  - https://www.christiedigital.com/globalassets/resources/public/020-000394-01-christie-l2k1000-user-manual-pjnm.pdf
  - https://www.projector-database.com/pdf/christiel2k1000-hc-en.pdf
retrieved_at: 2026-08-16T18:40:46.439Z
last_checked_at: 2026-08-19T09:05:37.245Z
generated_at: 2026-08-19T09:05:37.245Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "source is the network manual only (020-000395-01 Rev.1, 04-2011). RS-232 serial control (DB-9 ports exist on hardware) not covered in this source — no serial config or commands present."
  - "telnet command table is described as \"typical command lists\"; source states further commands exist but are only available from the dealer."
  - "PJLink Class 1 commands not enumerated in source (conformance stated, input parameter mapping only). PJLink TCP port not stated."
  - "SNMP port and OID/MIB details not stated in source."
  - "additional telnet commands exist per source (\"please consult your"
  - "web GUI operations (power ON/Standby buttons, input/source select,"
  - "literal telnet response strings for C-commands not documented in source."
  - "no multi-step control sequences documented in source."
  - "firmware version compatibility not stated in source"
  - "RS-232 serial protocol (ports exist on hardware) not in this source"
  - "full telnet command set beyond the 7 documented commands"
  - "PJLink command syntax/port; SNMP port, MIB/OIDs"
  - "telnet response strings per command"
verification:
  verdict: verified
  checked_at: 2026-08-19T09:05:37.245Z
  matched_actions: 8
  action_count: 8
  confidence: medium
  summary: "All 8 spec actions match literal C-commands in the telnet command table; port 10000 and PASSWORD auth are stated in source. (13 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-08-16
---

# Christie L2K1000/L2K1500 Control Spec

## Summary
Christie L2K1000 (network manual also covers L2K1500 family) large-venue lamp projector with built-in network control. This spec covers the documented network control surfaces: telnet control on TCP port 10000 (ASCII commands), an HTTP web-browser setup/control GUI, an SNMP agent (read-only "Refer" community + traps), and PJLink Standard Class 1 conformance.

<!-- UNRESOLVED: source is the network manual only (020-000395-01 Rev.1, 04-2011). RS-232 serial control (DB-9 ports exist on hardware) not covered in this source — no serial config or commands present. -->
<!-- UNRESOLVED: telnet command table is described as "typical command lists"; source states further commands exist but are only available from the dealer. -->
<!-- UNRESOLVED: PJLink Class 1 commands not enumerated in source (conformance stated, input parameter mapping only). PJLink TCP port not stated. -->
<!-- UNRESOLVED: SNMP port and OID/MIB details not stated in source. -->

## Transport
```yaml
protocols:
  - tcp
  - http
addressing:
  port: 10000  # telnet control port, explicitly stated: "The telnet 10000 port is used to control the projector."
  base_url: "http://{projector_ip}/"  # web control GUI; source: enter the projector's IP address into the browser address bar
auth:
  type: password  # Network PIN code (4-digit). Telnet: "PASSWORD:" prompt, enter PIN, empty Enter if none set (default 0000 = no PIN). Web: username "user" (fixed, cannot be changed) + Network PIN as password; auto-login when PIN is 0000.
```

## Traits
```yaml
# - powerable       (C00/C01 power on/off commands present)
# - routable        (C05-C08 input select commands present)
traits:
  - powerable  # inferred from C00/C01 power commands
  - routable   # inferred from C05-C08 input selection commands
```

## Actions
```yaml
# Telnet ASCII commands, terminated with Enter. Source: "Enter with ASCII 64-byte
# capital characters and one-byte characters." Payloads verbatim from source table.
- id: power_on
  label: Power On
  kind: action
  command: "C00"
  params: []

- id: power_off
  label: Power Off
  kind: action
  command: "C01"
  params: []

- id: select_input_1
  label: Select Input 1
  kind: action
  command: "C05"
  params: []

- id: select_input_2
  label: Select Input 2
  kind: action
  command: "C06"
  params: []

- id: select_input_3
  label: Select Input 3
  kind: action
  command: "C07"
  params: []

- id: select_input_4
  label: Select Input 4
  kind: action
  command: "C08"
  params: []

- id: menu_display_on
  label: Menu Display On
  kind: action
  command: "C1C"
  params: []

- id: menu_display_off
  label: Menu Display Off
  kind: action
  command: "C1D"
  params: []

# UNRESOLVED: additional telnet commands exist per source ("please consult your
# local dealer for further information of another commands") but are not documented.
# UNRESOLVED: web GUI operations (power ON/Standby buttons, input/source select,
# system select, image adjustment, PC adjustment, screen/lens setting, setting
# menus, PJ lock suspend execute, filter roll-up, factory default) are documented
# as browser functions only - no HTTP request payloads/paths are given in source.
```

## Feedbacks
```yaml
- id: login_prompt
  type: string
  values: ["PASSWORD:"]  # telnet login prompt on established connection

- id: login_success
  type: string
  values: ["Hello"]  # reply when telnet login succeeded

- id: power_state  # displayed on web "Power & Status" page
  type: enum
  values: [on, off, on_starting_up, on_cooling_down, service_in_need]

- id: projector_status  # "Status" on web Power & Status page
  type: enum
  values:
    - normal
    - power_management_in_operation
    - shutter_management_in_operation
    - lamp_failure
    - abnormal_temperature
    - standby_after_abnormal_temp
    - power_failure

# UNRESOLVED: literal telnet response strings for C-commands not documented in source.
```

## Variables
```yaml
# Settable via web Control GUI ("Image adjustment" / "PC Adj." pages). Ranges
# verbatim from source. No machine-level payload documented (browser GUI only).
- id: contrast
  type: integer
  range: [0, 63]
- id: brightness
  type: integer
  range: [0, 63]
- id: color_saturation
  type: integer
  range: [0, 63]
- id: tint
  type: integer
  range: [0, 63]
- id: color_temp
  type: enum
  values: [X Low, Low, Mid, High, Adj]
- id: white_balance_red
  type: integer
  range: [0, 63]
- id: white_balance_green
  type: integer
  range: [0, 63]
- id: white_balance_blue
  type: integer
  range: [0, 63]
- id: offset_red
  type: integer
  range: [0, 63]
- id: offset_green
  type: integer
  range: [0, 63]
- id: offset_blue
  type: integer
  range: [0, 63]
- id: auto_picture_control
  type: enum
  values: [OFF, L1, L2]
- id: advanced_color
  type: enum
  values: [Auto, OFF]
- id: sharpness
  type: integer
  range: [0, 31]
- id: gamma
  type: integer
  range: [0, 15]
- id: noise_reduction
  type: enum
  values: [ON, OFF]
- id: progressive
  type: enum
  values: [OFF, ON, Film]
- id: fine_sync
  type: integer
  range: [0, 31]
```

## Events
```yaml
# Unsolicited notifications, delivered as SNMP traps (up to 10 trap addresses)
# and/or alert e-mails. Condition items verbatim from source.
- id: lamp_off_unexpected
  description: "Lamp goes out without user operation"
- id: standby_proper_operation
  description: "Projector turned into Standby in proper user operation"
- id: internal_temperature_high
  description: "Internal temperature over safety limit; lamp turned off, cooling process runs"
- id: service_required
  description: "Maintenance requirement detected (includes error information block)"
- id: lamp_replacement_time
  description: "Lamp 1/lamp 2 reached replacement time (includes per-lamp ON hours)"
- id: brightness_drop_constant_mode
  description: "Brightness (current value) continuously drops at a certain rate from target value in Constant mode"
- id: use_time_threshold
  description: "Configurable use-time condition alert (up to 99,999 hours)"
```

## Macros
```yaml
# UNRESOLVED: no multi-step control sequences documented in source.
```

## Safety
```yaml
confirmation_required_for: []
interlocks:
  - "Projector cannot be turned on while it is on cooling down."
  - "When a security (PIN code lock) is set on the projector, it cannot be controlled through the network; 'PJ lock suspend' (Setting sub menu [3]) must be executed to unlock temporarily."
  - "Telnet: 4 consecutive failed password authentications cause automatic disconnect."
  - "Power failure status: unplug the AC cord and ask servicing by qualified service personnel."
  - "After abnormal-temperature standby: wait for cooling completion, verify Standby, check air filter for dust before re-powering."
  - "Do not reset Filter counter or Scrolls remaining unless the filter cartridge has been replaced."
```

## Notes
- Telnet session: connect `open <ip> 10000`; answer `PASSWORD:` with Network PIN (or empty Enter if none); `Hello` confirms login; commands terminated with Enter; disconnect via Ctrl+] then `close`.
- Telnet auto-disconnects after 30 seconds of no password/command entry.
- Web GUI polls and refreshes projector condition every 30 seconds automatically.
- Web control requires projector powered on; in standby, control items are inactive/ineffective.
- Web login username fixed at `user`; cannot be changed. Default Network PIN `0000` = no PIN (auto-login).
- Changing Network PIN or network settings restarts projector (~10 seconds) — reconnect after.
- Setting IP address to `0.0.0.0` resets all network settings to defaults (DHCP Off, IP 169.254.100.100, mask 255.255.0.0, gateway/DNS 255.255.255.255).
- SNMP agent: read-only ("Refer") access mode only; default community `public`; traps to up to 10 addresses, default trap community `public`.
- PJLink Standard Class 1 compliant (JBMIA). Input parameter mapping from source:
  Input 1: RGB(PC analog)=11, RGB(Scart)=12, RGB(PC digital)=31, RGB(AV HDCP)=32, HDMI=33, AUX 1=46;
  Input 2: Video=21, Y/Pb/Pr=22, RGB=13, S-video=25, AUX 2=47;
  Input 3: AUX 3=48; Input 4: AUX 4=49.
- PJLink password: 1–32 alphanumeric characters; authentication ON/OFF switchable.
- E-mail alert function: SMTP (port 1–65535), optional SMTP auth (CRAM-MD5/LOGIN/PLAIN) or POP before SMTP, up to 10 recipient addresses; requires DNS set correctly.
- Firmware version displayed on lower part of web "Initial setting" page; firmware update over network requires special dealer tool.
- Web GUI requires JavaScript enabled; proxy must be bypassed for local/direct connections.

<!-- UNRESOLVED: firmware version compatibility not stated in source -->
<!-- UNRESOLVED: RS-232 serial protocol (ports exist on hardware) not in this source -->
<!-- UNRESOLVED: full telnet command set beyond the 7 documented commands -->
<!-- UNRESOLVED: PJLink command syntax/port; SNMP port, MIB/OIDs -->
<!-- UNRESOLVED: telnet response strings per command -->
````

Self-check pass: no port/baud/voltage invented — 10000 stated; auth from source; draft/low set; payloads verbatim; serial block omitted (N/A, not in source).

## Provenance

```yaml
source_domains:
  - christiedigital.com
  - projector-database.com
source_urls:
  - https://www.christiedigital.com/globalassets/resources/public/020-000395-01-christie-l2k1000-user-manual-net.pdf
  - https://www.christiedigital.com/globalassets/resources/public/020-000393-01-christie-l2k1000-user-manual.pdf
  - https://www.christiedigital.com/globalassets/resources/public/020-000409-01-christie-l2k1000-setup-guide.pdf
  - https://www.christiedigital.com/globalassets/resources/public/020-000394-01-christie-l2k1000-user-manual-pjnm.pdf
  - https://www.projector-database.com/pdf/christiel2k1000-hc-en.pdf
retrieved_at: 2026-08-16T18:40:46.439Z
last_checked_at: 2026-08-19T09:05:37.245Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-08-19T09:05:37.245Z
matched_actions: 8
action_count: 8
confidence: medium
summary: "All 8 spec actions match literal C-commands in the telnet command table; port 10000 and PASSWORD auth are stated in source. (13 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "source is the network manual only (020-000395-01 Rev.1, 04-2011). RS-232 serial control (DB-9 ports exist on hardware) not covered in this source — no serial config or commands present."
- "telnet command table is described as \"typical command lists\"; source states further commands exist but are only available from the dealer."
- "PJLink Class 1 commands not enumerated in source (conformance stated, input parameter mapping only). PJLink TCP port not stated."
- "SNMP port and OID/MIB details not stated in source."
- "additional telnet commands exist per source (\"please consult your"
- "web GUI operations (power ON/Standby buttons, input/source select,"
- "literal telnet response strings for C-commands not documented in source."
- "no multi-step control sequences documented in source."
- "firmware version compatibility not stated in source"
- "RS-232 serial protocol (ports exist on hardware) not in this source"
- "full telnet command set beyond the 7 documented commands"
- "PJLink command syntax/port; SNMP port, MIB/OIDs"
- "telnet response strings per command"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
