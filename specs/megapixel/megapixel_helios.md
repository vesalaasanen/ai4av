---
spec_id: admin/megapixel-helios
schema_version: ai4av-public-spec-v1
revision: 2
title: "Megapixel Helios Control Spec"
manufacturer: Megapixel
model_family: HELIOS
aliases: []
compatible_with:
  manufacturers:
    - Megapixel
  models:
    - HELIOS
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - megapixelvr.com
source_urls:
  - "https://megapixelvr.com/downloads/HELIOS%20Processing%20System-User%20Guide.pdf"
retrieved_at: 2026-06-04T03:28:46.038Z
last_checked_at: 2026-07-21T23:32:28.673Z
generated_at: 2026-07-21T23:32:28.673Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "REST API endpoint documentation not available in source (available on request)"
  - "unsolicited notifications not detailed in source"
  - "multi-step sequences not documented in source"
  - "no safety warnings or interlock procedures in source"
  - "REST API endpoint structure and authentication not documented in source"
  - "NMOS event subscription formats not documented in source"
  - "specific test pattern IDs not enumerated in source"
verification:
  verdict: verified
  checked_at: 2026-07-21T23:32:28.673Z
  matched_actions: 14
  action_count: 14
  confidence: medium
  summary: "All 14 spec sACN channel commands match the source table exactly with correct parameter ranges and behaviors; transport parameters verified. (7 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-04-19
---

# Megapixel Helios Control Spec

## Summary
The Megapixel HELIOS is a professional LED video processor supporting ST 2110, sACN, and REST API-based control. It provides brightness, gamma, color gains, blackout, freeze, and test pattern functions via sACN (DMX-like over UDP), with an HTTP-based web UI and API on port 80/443. NMOS IS-04/IS-05 enable SMPTE ST 2110 network discovery and routing. Stacking on TCP+UDP 56004 synchronizes multi-processor walls.

<!-- UNRESOLVED: REST API endpoint documentation not available in source (available on request) -->

## Transport
```yaml
protocols:
  - http   # HTTP Web UI on TCP 80; HTTPS on TCP 443
  - tcp    # NMOS on TCP 5000; Stacking on TCP+UDP 56004; Cloud backchannel on TCP 56066 outbound
  - udp    # sACN/E1.31 on UDP 5568; SSDP on UDP 1900; mDNS on UDP 5353; Stacking on TCP+UDP 56004
addressing:
  base_url: http://{helios-ip}  # HTTP on 80, HTTPS on 443
  port: 80  # HTTP Web UI primary; see protocols[] comments for full port list
auth:
  type: none  # inferred: no auth procedure documented in source for local web UI access
  # HTTPS supported with self-signed cert by default; CA-signed cert + DNS name required for HSTS
```

## Traits
```yaml
- powerable      # Blackout command (sACN channel 1)
- routable       # Input routing via NMOS IS-04/IS-05
- queryable      # sACN active state feedback
- levelable      # Brightness, gamma, color gains, intensity
```

## Actions
```yaml
# Main Channels (1-8)
- id: blackout
  label: Blackout
  kind: action
  command: "sACN ch1: 0=Normal, 128-255=Blackout"
  params: []
  notes: "sACN value >= 128 activates blackout; value 0 = normal operation"

- id: freeze
  label: Freeze
  kind: action
  command: "sACN ch2: 0=Normal, 128-255=Freeze"
  params: []
  notes: "sACN value >= 128 activates freeze; value 0 = normal operation"

- id: set_brightness
  label: Set Brightness
  kind: action
  command: "sACN ch3: 0-255 (0-100%)"
  params:
    - name: value
      type: integer
      description: "0-255 mapped to 0-100%"

- id: set_gamma
  label: Set Gamma
  kind: action
  command: "sACN ch4: 0-255 (1.0-4.0, Gamma 2.4=119)"
  params:
    - name: value
      type: integer
      description: "0-255 mapped to gamma 1.0-4.0 (e.g. 119 = 2.4 SDR)"

- id: show_test_pattern
  label: Show Test Pattern
  kind: action
  command: "sACN ch5: 0=Normal, 1-255=Test pattern"
  params:
    - name: pattern_id
      type: integer
      description: "0 = normal operation, 1-255 = test pattern number"

- id: set_output_red
  label: Set Output Red
  kind: action
  command: "sACN ch6: 0-200 (0.0-2.0)"
  params:
    - name: value
      type: integer
      description: "0-200 mapped to 0.0-2.0 multiplier"

- id: set_output_green
  label: Set Output Green
  kind: action
  command: "sACN ch7: 0-200 (0.0-2.0)"
  params:
    - name: value
      type: integer
      description: "0-200 mapped to 0.0-2.0 multiplier"

- id: set_output_blue
  label: Set Output Blue
  kind: action
  command: "sACN ch8: 0-200 (0.0-2.0)"
  params:
    - name: value
      type: integer
      description: "0-200 mapped to 0.0-2.0 multiplier"

# Tile Group Actions (channels 10-15, default start address 10)
- id: set_tile_intensity
  label: Set Tile Group Intensity
  kind: action
  command: "sACN ch10: 0-200 (0.0-2.0)"
  params:
    - name: value
      type: integer
      description: "0-200 mapped to 0.0-2.0"

- id: set_tile_red
  label: Set Tile Group Red Gains
  kind: action
  command: "sACN ch11: 0-200 (0.0-2.0)"
  params:
    - name: value
      type: integer
      description: "0-200"

- id: set_tile_green
  label: Set Tile Group Green Gains
  kind: action
  command: "sACN ch12: 0-200 (0.0-2.0)"
  params:
    - name: value
      type: integer
      description: "0-200"

- id: set_tile_blue
  label: Set Tile Group Blue Gains
  kind: action
  command: "sACN ch13: 0-200 (0.0-2.0)"
  params:
    - name: value
      type: integer
      description: "0-200"

- id: set_tile_pattern_toggle
  label: Set Tile Group Pattern Toggle
  kind: action
  command: "sACN ch14: 0-127=OFF, 128-255=ON"
  params:
    - name: value
      type: integer
      description: "0-127 = OFF, 128-255 = ON"

- id: set_tile_pattern_alpha
  label: Set Tile Group Pattern Alpha
  kind: action
  command: "sACN ch15: 0=Transparent, 255=Opaque"
  params:
    - name: value
      type: integer
      description: "0 = full transparent, 255 = opaque"
```

## Feedbacks
```yaml
- id: sacn_active
  label: sACN Active State
  type: boolean
  notes: "Green bar displayed above channels when sACN is valid and active"

- id: sacn_source_name
  label: sACN Source Name
  type: string
  notes: "Displayed in green bar when sACN is active"
```

## Variables
```yaml
# sACN-controlled parameters (set via Actions, reported via Feedbacks)
- id: brightness
  type: integer
  range: [0, 255]
  notes: "Slider 0-100% maps to sACN 0-255"

- id: gamma
  type: integer
  range: [0, 255]
  notes: "Slider 1.0-4.0 maps to sACN 0-255 (Gamma 2.4 = 119)"

- id: tile_group_start_address
  type: integer
  range: [1, 512]
  notes: "Default start address is 10; configurable via Tile Group Settings"

- id: ptp_domain
  type: integer
  range: [0, 255]
  notes: "PTP domain identifier; default 127. Requires PTP globally enabled in Processor > Settings to take effect on ST 2110 streams."

- id: ptp_enabled
  type: boolean
  notes: "Global PTP enable/disable toggle; must be enabled for ST 2110 streams to use PTP"
```

## Events
```yaml
# UNRESOLVED: unsolicited notifications not detailed in source
# NMOS events (IS-04 registration, IS-05 connection changes) likely present
# but specific event formats not documented in source
```

## Macros
```yaml
# UNRESOLVED: multi-step sequences not documented in source
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: no safety warnings or interlock procedures in source
```

## Notes

**Network Ports (Linux/Alpine build):**
| Port | Protocol | Service |
|---|---|---|
| 80 | TCP | Main Web UI and Public API (HTTP) |
| 443 | TCP | Main Web UI, Public API (HTTPS) |
| 443 | TCP Outbound | General Megapixel Cloud connections |
| 1900 | TCP+UDP | Service Discovery (SSDP) |
| 56066 | TCP Outbound | Megapixel Cloud back-channeled remote connections |
| 5353 | UDP | Service Discovery (mDNS) |
| 5568 | UDP | Public API / Control (sACN) |
| 56004 | TCP+UDP | HELIOS Stacking |
| 5000 | TCP | NMOS |
| ICMP | — | Network ping |

**Network Configuration:**
- Factory reset defaults to DHCP/Auto IP
- If DHCP unavailable, defaults to link-local (169.254.x.x)
- Fixed IP configuration supported
- MAC address for DHCP Client ID must use colon format (XX:XX:XX:XX:XX:XX)
- Network Discovery (DNS-SD + SSDP) can be toggled on/off in Networking settings

**sACN Control:**
- Main channels 1-8: Blackout, Freeze, Brightness, Gamma, Test Pattern, Output RGB
- Tile group channels 10-15 (default start address 10): Intensity, RGB gains, Pattern toggle/alpha
- When sACN is active, GUI controls for those functions are locked (highlighted in turquoise)
- GUI locked for sACN-controlled functions; function names highlighted in turquoise

**ST 2110 / SDP:**
- HELIOS requires an SDP (Session Description Protocol) record to locate ST 2110 streams
- SDP records uploaded via the web UI upload icon
- SDP records use ISO 10646 character set in UTF-8 encoding; field/attribute names use US-ASCII subset
- Required SDP fields: v (version), o (originator), s (session name), t (time), m (media), c (connection)
- Required media attributes: a=rtpmap, a=mediaclk, a=source-filter, a=fmtp
- Dynamic payload type 112 used for uncompressed video; must match across m-line, a=rtpmap, a=fmtp
- Example payload type 112 params: `sampling=YCbCr-4:2:2; width=1920; height=1080; exactframerate=24000/1001; depth=12; TCS=SDR; colorimetry=BT2020; PM=2110GPM; TP=2110TPN; SSN=ST2110-20:2017;`

**NMOS (IS-04/IS-05):**
- NMOS runs on the Management LAN; inbound content arrives on the Media LAN
- HELIOS node contains one device with four (4) receivers
- mDNS used to discover the NMOS Registry (Settings > Processor Settings > NMOS)
- 100G receivers have two (2) legs/paths for ST 2022-7 redundancy
- 10G inputs advertise one (1) leg per receiver; no redundant streams
- Controller queries registry (IS-04) for topology, then patches senders to receivers (IS-05)
- Manual patching via web UI is supported as fallback

**PTP Settings:**
- Enable/Disable PTP toggle in Processor > Settings (must be globally enabled before per-stream PTP takes effect)
- Domain 0-255; default 127
- HELIOS supports SMPTE ST 2059 2021 PTP profile
- HELIOS prefers PTP for any ST 2110 stream whose SDP specifies PTP

**ST 2110 Input Specifications — 10G:**
- 4 inputs
- Bit depths: 8, 10, 12 BPC
- Color: 4:4:4 or 4:2:2
- Max bandwidth: 531 Megapixels/sec, 4K@50Hz per input
- Redundancy: No

**ST 2110 Input Specifications — 100G:**
- 4 inputs
- Bit depths: 8, 10, 12 BPC
- Color: 4:4:4 or 4:2:2
- Input A max bandwidth: 2,124 Megapixels/sec, 8K@60Hz
- Inputs B/C/D max bandwidth: 780 Megapixels/sec each, up to 4800x2700@60Hz (combined 8K@60Hz)
- Redundancy: Yes (ST 2022-7)
- Total across all inputs must be <= 2,124 Megapixels/sec

**Supported SDI Input Formats:**
- Pixel format: YCbCr 4:2:2
- All signals Level A; 1080p 50/60 Hz may be Level B
- 2SI or square division combining; square division only across separate physical inputs and not scalable
- No interlaced or PsF support
- Resolutions/frame rates:
  - 1280x720: 23.98 / 24
  - 1920x1080: 24.97 / 25
  - 2048x1080: 29.97 / 30
  - 3840x2160: 49.95 / 50
  - 4096x2160: 59.94 / 60

**HTTPS / TLS (HELIOS 23.12):**
- Self-signed certificate generated by default
- TLS 1.2 ciphers: ECDHE-RSA-AES128/256-GCM-SHA256/384, ECDHE-RSA-AES128/256-CBC-SHA256/384, ECDHE-RSA-CHACHA20-POLY1305-SHA256, ECDHE-RSA-AES128/256-CBC-SHA
- TLS 1.3 ciphers: AKE-AES256-GCM-SHA384, AKE-CHACHA20-POLY1305-SHA256, AES128-GCM-SHA384
- All ciphers rated A by nmap ssl-enum-ciphers
- Certificate and private key must be PEM (RFC7468)
- Cert PEM begins with `-----BEGIN CERTIFICATE-----`
- Key PEM begins with `-----BEGIN PRIVATE KEY-----` (or ENCRYPTED/EC variants)
- serverauth extendedKeyUsage required for self-signed certs to avoid browser warnings
- HSTS requires: FQDN-resolvable hostname, CA-signed cert, Redirect to HTTPS enabled; HSTS ignored on IP-based connections

**HELIOS Stacking (Multi-Processor Sync):**
- Synchronizes blackout, freeze, and color adjustments across processors in the same stack
- Assign stack name via web UI to join
- Communication on TCP+UDP 56004

**REST API:**
- HELIOS has a REST-like API; documentation available on request via HELIOS support website
- HTTP/HTTPS on port 80/443
<!-- UNRESOLVED: REST API endpoint structure and authentication not documented in source -->
<!-- UNRESOLVED: NMOS event subscription formats not documented in source -->
<!-- UNRESOLVED: specific test pattern IDs not enumerated in source -->

## Provenance

```yaml
source_domains:
  - megapixelvr.com
source_urls:
  - "https://megapixelvr.com/downloads/HELIOS%20Processing%20System-User%20Guide.pdf"
retrieved_at: 2026-06-04T03:28:46.038Z
last_checked_at: 2026-07-21T23:32:28.673Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-07-21T23:32:28.673Z
matched_actions: 14
action_count: 14
confidence: medium
summary: "All 14 spec sACN channel commands match the source table exactly with correct parameter ranges and behaviors; transport parameters verified. (7 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "REST API endpoint documentation not available in source (available on request)"
- "unsolicited notifications not detailed in source"
- "multi-step sequences not documented in source"
- "no safety warnings or interlock procedures in source"
- "REST API endpoint structure and authentication not documented in source"
- "NMOS event subscription formats not documented in source"
- "specific test pattern IDs not enumerated in source"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
