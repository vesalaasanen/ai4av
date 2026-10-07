---
spec_id: admin/skaarhoj-eth-sdi-link
schema_version: ai4av-public-spec-v1
revision: 1
title: "Skaarhoj ETH-SDI Link Control Spec"
manufacturer: Skaarhoj
model_family: "ETH-SDI Link"
aliases: []
compatible_with:
  manufacturers:
    - Skaarhoj
  models:
    - "ETH-SDI Link"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - pid.skaarhoj.com
  - skaarhoj.com
source_urls:
  - https://pid.skaarhoj.com/Manuals/SKAARHOJ_manual-ETH-SDI-LINK-V2.pdf
  - https://www.skaarhoj.com/raw-panel
retrieved_at: 2026-06-29T20:31:03.734Z
last_checked_at: 2026-10-07T12:52:40.139Z
generated_at: 2026-10-07T12:52:40.139Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "HTTP web port not explicitly stated (URL shows http://<device_ip>/ without port)."
  - "Regular USB serial monitor baud rate not stated (115200 only documented for Raw Panel USB mode)."
  - "ATEM-2-SDI forwarding parameters are pass-through; no direct commands documented for setting them on this device."
  - "HTTP web port not explicitly stated (default URL omits port)"
  - "not stated in source"
  - "auth token format / mechanism (Basic? form?) not specified beyond username+password"
  - "exact JSON schema for getInfo response not documented in source"
  - "exact response format not documented in source"
  - "no settable continuous parameters documented as direct commands."
  - "no unsolicited notification protocol documented."
  - "no multi-step sequences explicitly documented in source."
  - "no explicit interlock sequences or power-on ordering requirements stated in source."
  - "TSL 5.0 message format, TSL 3.1 byte layout, and Raw Panel TCP wire protocol byte format not documented in this source."
  - "HTTP API authentication mechanism (Basic Auth header vs form login) not specified."
verification:
  verdict: verified
  checked_at: 2026-10-07T12:52:40.139Z
  matched_actions: 24
  action_count: 24
  confidence: medium
  summary: "All 24 spec actions match source serial, HTTP and Raw Panel commands with correct shapes; transport values are supported and the source catalogue is fully covered. (14 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-29
---

# Skaarhoj ETH-SDI Link Control Spec

## Summary
The Skaarhoj ETH-SDI Link bridges Ethernet-based control systems to embedded SDI workflows for Blackmagic Design cameras. It receives tally and camera control commands over UDP/TCP and embeds them as ancillary data into the SDI output. The device exposes a REST-style HTTP API, a Raw Panel TCP server (port 9923), a TSL UDP listener (port 7001), and a USB serial monitor for configuration and maintenance.

<!-- UNRESOLVED: HTTP web port not explicitly stated (URL shows http://<device_ip>/ without port). -->
<!-- UNRESOLVED: Regular USB serial monitor baud rate not stated (115200 only documented for Raw Panel USB mode). -->
<!-- UNRESOLVED: ATEM-2-SDI forwarding parameters are pass-through; no direct commands documented for setting them on this device. -->

## Transport
```yaml
protocols:
  - http
  - tcp
  - udp
  - serial
addressing:
  base_url: "http://<device_ip>"  # HTTP API and Web UI; port not explicitly stated in source
  port: 9923  # Raw Panel TCP server (stated)
  # UNRESOLVED: HTTP web port not explicitly stated (default URL omits port)
  # Note: UDP TSL listener uses port 7001 (stated separately below); single `port` field cannot represent multi-protocol ports.
serial:
  baud_rate: 115200  # stated for Raw Panel over USB mode only
  data_bits: null  # UNRESOLVED: not stated in source
  parity: null  # UNRESOLVED: not stated in source
  stop_bits: null  # UNRESOLVED: not stated in source
  flow_control: null  # UNRESOLVED: not stated in source
auth:
  type: credentials  # Web UI uses username/password; default admin/skaarhoj
  # Note: credentials transmitted unencrypted. "Allow access without login" option can disable auth.
  # UNRESOLVED: auth token format / mechanism (Basic? form?) not specified beyond username+password
udp:
  listen_port: 7001  # TSL UDP listener default (stated)
```

## Traits
```yaml
- queryable  # inferred from getInfo, ip=?, getCID, dumpIP, sockets, ping query commands
```

## Actions
```yaml
# --- USB Serial Monitor commands (protocol: serial) ---

- id: serial_help
  label: Show Help Message
  kind: query
  command: "help"
  params: []

- id: serial_set_ip
  label: Set Static IP
  kind: action
  command: "ip={address}"
  params:
    - name: address
      type: string
      description: Static IP a.b.c.d, or 0.0.0.0 for DHCP

- id: serial_set_subnet
  label: Set Subnet Mask
  kind: action
  command: "subnet={address}"
  params:
    - name: address
      type: string
      description: Subnet mask a.b.c.d

- id: serial_set_gateway
  label: Set Gateway Address
  kind: action
  command: "gateway={address}"
  params:
    - name: address
      type: string
      description: Gateway address a.b.c.d

- id: serial_set_dns
  label: Set DNS Server
  kind: action
  command: "dns={address}"
  params:
    - name: address
      type: string
      description: DNS server a.b.c.d

- id: serial_reset
  label: Soft Reset
  kind: action
  command: "reset"
  params: []

- id: serial_reboot
  label: Reboot (alias for reset)
  kind: action
  command: "reboot"
  params: []

- id: serial_notick
  label: Disable dot/loopcount output
  kind: action
  command: "notick"
  params: []

- id: serial_ping
  label: Ping (Returns ack)
  kind: query
  command: "ping"
  params: []

- id: serial_debug
  label: Enable Debug Mode
  kind: action
  command: "debug"
  params: []

- id: serial_sockets
  label: Show Socket Status
  kind: query
  command: "sockets"
  params: []

- id: serial_newmac
  label: Generate and Save New MAC Address
  kind: action
  command: "newmac"
  params: []

- id: serial_reset_all
  label: Clear User Settings and Reset
  kind: action
  command: "_resetAll"
  params: []

- id: serial_get_cid
  label: Get Device CID
  kind: query
  command: "getCID"
  params: []

- id: serial_get_info
  label: Display Device Status (JSON)
  kind: query
  command: "getInfo"
  params: []

- id: serial_ip_query
  label: Get Current IP Address
  kind: query
  command: "ip=?"
  params: []

- id: serial_dump_ip
  label: Display IP Configuration
  kind: query
  command: "dumpIP"
  params: []

- id: serial_raw_panel_mode
  label: Enter Raw Panel Mode (USB)
  kind: action
  command: "serialRawPanel"
  params: []

- id: rawpanel_list
  label: List (Raw Panel)
  kind: query
  command: "list"
  params: []

- id: serial_eth_autoneg
  label: Set Ethernet Auto-Negotiation
  kind: action
  command: "ethautoneg={value}"
  params:
    - name: value
      type: integer
      description: "1 = enable, 0 = disable (reboot required)"

# --- HTTP API commands (protocol: http) ---

- id: http_tally_control
  label: Tally Control
  kind: action
  command: "GET http://<device_ip>/tally/{color}/{camera}/{action}"
  params:
    - name: color
      type: string
      description: "Tally color: red or green"
    - name: camera
      type: integer
      description: Camera number (1-8)
    - name: action
      type: string
      description: "set (ON), clear (OFF), toggle, or empty (read state)"

- id: http_bars_control
  label: Color Bars Control
  kind: action
  command: "GET http://<device_ip>/bars/{camera}/{action}"
  params:
    - name: camera
      type: integer
      description: Camera number (1-8)
    - name: action
      type: string
      description: "set (ON, 30s timeout), clear (OFF), toggle, or empty (read state)"

# --- Raw Panel commands (protocol: tcp, port 9923) ---

- id: rawpanel_hwc_set
  label: Set HWC Tally Value
  kind: action
  command: "HWC#{n}={value}"
  params:
    - name: n
      type: integer
      description: "HWC ID 1-16 (odd=red, even=green per camera 1-8)"
    - name: value
      type: integer
      description: "32 = ON, 0 = OFF"

- id: rawpanel_clear
  label: Clear All Tallies
  kind: action
  command: "Clear"
  params: []
```

## Feedbacks
```yaml
- id: tally_state
  type: object
  description: HTTP API JSON response for tally state
  values:
    tally: string  # "red" or "green"
    channel: integer  # 1-8
    state: boolean

- id: device_info_json
  type: object
  description: JSON device status returned by getInfo serial command
  # UNRESOLVED: exact JSON schema for getInfo response not documented in source

- id: ip_config
  type: object
  description: IP configuration dump returned by dumpIP serial command
  # UNRESOLVED: exact response format not documented in source

- id: socket_status
  type: object
  description: Socket status returned by sockets serial command
  # UNRESOLVED: exact response format not documented in source

- id: device_cid
  type: string
  description: Device CID returned by getCID serial command
```

## Variables
```yaml
# UNRESOLVED: no settable continuous parameters documented as direct commands.
# ATEM-2-SDI forwards Iris/Focus/Gain/White Balance/Lift/Gamma/Saturation/Hue/Shutter/Contrast
# from an ATEM switcher, but these are pass-through, not direct settable variables on this device.
```

## Events
```yaml
# UNRESOLVED: no unsolicited notification protocol documented.
# Note: device emits dot/loopcount output every second by default (disabled via `notick`).
```

## Macros
```yaml
# UNRESOLVED: no multi-step sequences explicitly documented in source.
```

## Safety
```yaml
confirmation_required_for: []
interlocks:
  - warning: "Avoid enabling multiple control methods simultaneously (ATEM-2-SDI + TSL + Raw Panel). Conflicting commands can cause unpredictable behavior."
  - warning: "Login credentials transmitted unencrypted. Use only on trusted local networks. Do not expose directly to the internet."
# UNRESOLVED: no explicit interlock sequences or power-on ordering requirements stated in source.
```

## Notes
- SDI output supports 3G-SDI Level B mapping only; Level A signals are not compatible.
- Camera does not need to run the same video format as the program input (e.g. cameras in Ultra HD while protocol sent over HD-SDI).
- Raw Panel supports up to 3 simultaneous TCP clients on port 9923; device advertises via mDNS.
- HWC tally mapping: HWC #1=Cam1 Red, #2=Cam1 Green, #3=Cam2 Red, #4=Cam2 Green, ... up to Cam8 (HWC #15/#16).
- TSL 3.1 and TSL 5.0 can run simultaneously on the same UDP port 7001.
- Color bars enabled via HTTP/Control tab auto-timeout after 30 seconds.
- ATEM Constellation series switchers may cause slower connection times or intermittent connectivity.
- Entering Raw Panel USB mode (`serialRawPanel`) disables all other serial communication until power cycle.
<!-- UNRESOLVED: TSL 5.0 message format, TSL 3.1 byte layout, and Raw Panel TCP wire protocol byte format not documented in this source. -->
<!-- UNRESOLVED: HTTP API authentication mechanism (Basic Auth header vs form login) not specified. -->

## Provenance

```yaml
source_domains:
  - pid.skaarhoj.com
  - skaarhoj.com
source_urls:
  - https://pid.skaarhoj.com/Manuals/SKAARHOJ_manual-ETH-SDI-LINK-V2.pdf
  - https://www.skaarhoj.com/raw-panel
retrieved_at: 2026-06-29T20:31:03.734Z
last_checked_at: 2026-10-07T12:52:40.139Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-10-07T12:52:40.139Z
matched_actions: 24
action_count: 24
confidence: medium
summary: "All 24 spec actions match source serial, HTTP and Raw Panel commands with correct shapes; transport values are supported and the source catalogue is fully covered. (14 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "HTTP web port not explicitly stated (URL shows http://<device_ip>/ without port)."
- "Regular USB serial monitor baud rate not stated (115200 only documented for Raw Panel USB mode)."
- "ATEM-2-SDI forwarding parameters are pass-through; no direct commands documented for setting them on this device."
- "HTTP web port not explicitly stated (default URL omits port)"
- "not stated in source"
- "auth token format / mechanism (Basic? form?) not specified beyond username+password"
- "exact JSON schema for getInfo response not documented in source"
- "exact response format not documented in source"
- "no settable continuous parameters documented as direct commands."
- "no unsolicited notification protocol documented."
- "no multi-step sequences explicitly documented in source."
- "no explicit interlock sequences or power-on ordering requirements stated in source."
- "TSL 5.0 message format, TSL 3.1 byte layout, and Raw Panel TCP wire protocol byte format not documented in this source."
- "HTTP API authentication mechanism (Basic Auth header vs form login) not specified."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
